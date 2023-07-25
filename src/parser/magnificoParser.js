import { JSDOM } from "jsdom";

class MagnificoParser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(html);
    }

    getCards = () => {

        const todo = this.dom.window.document.querySelector("#content");
        const cards = todo.querySelectorAll(".views-row");
        return cards;
    }

    getTitle = (card) => {
        return card.querySelector(".views-field.views-field-title.title").textContent;
    }

    getPrice = (card) => {
        const priceElement = card.querySelector(".price-item meta[itemprop='price']");
        const price = priceElement.getAttribute("content");
        return price;
    }

    getImage = (card) => {
        const imgElement = card.querySelector("img.img-responsive");
        const dataRValue = imgElement.getAttribute("data-r");

        // Convertir la cadena data-r en un objeto JSON
        const dataRObject = JSON.parse(dataRValue);

        // si no tiene el punto S el dataBoject devuelve un objeto
        const imageURLFull = dataRObject.s;
        const urlPrincipio = "https://www.macnificos.com/sites/files/styles/product_list_desktop_1x"
        const imageURL = `${urlPrincipio}${imageURLFull}`;
        console.log(imageURL);
        return imageURL;
    }

    getUrl = (card) => {
        const linkElement = card.querySelector(".wrapper-link");
        if (linkElement) {
            return "https://www.macnificos.com/" + linkElement.getAttribute("href");
        } else {
            return null; // O cualquier valor por defecto que desees en caso de que no se encuentre el enlace
        }
    }

    getCard = (card) => {
        return {
            title: this.getTitle(card),
            price: this.getPrice(card),
            url: this.getUrl(card)
        };
    }

    getCardsArray = () => {
        const cards = this.getCards();
        const cardsArray = [];
        for (let card of cards) {
            try {
                cardsArray.push(this.getCard(card));
            }
            catch (e) {
                console.log(e);
            }
        }
        return cardsArray;
    }

}


export default MagnificoParser;