import Parser from "../../src/parser/magnificoParser.js";
import fs from "fs";

describe("Parser", () => {
    let parser;
    let html;

    beforeAll(async () => {
        html = fs.readFileSync("test/magnificoTest.html", "utf8");
        parser = new Parser(html);
    })

    it("should return all card containers", async () => {
        const cards = parser.getCards();
        console.log(cards)
        console.log(cards[1].textContent)
        console.log("number of cards:", cards.length)
        //console.log("type:", typeof cards);
        expect(cards.length).toBe(150);
    })

    it("should return the title of a card", async () => {
        const cards = parser.getCards();
        const title = parser.getTitle(cards[1]);
        console.log(title)
        expect(title).toContain('BenQ BL2420PT Monitor 23,8" 16:9 QHD IPS 100% sRGB/Rec. 709 HDMI DP');
    });

    it("should return the price of a card", async () => {
        const cards = parser.getCards();
        const price = parser.getPrice(cards[1]);
        console.log(price)
        expect(price).toBe("199.99");

    });

    it("should return the image of a card", async () => {
        const cards = parser.getCards();
        const image = parser.getImage(cards[1]);
        console.log(image)
        expect(image).toContain("https://www.macnificos.com/sites/files/styles/product_list_desktop_1x/public/images/product/bl2420pt022.jpg")
    })

    it("should return the url of a card", async () => {
        // Obtener las cards utilizando la función parser (puedes adaptar esta parte según tu implementación)
        const cards = parser.getCards();

        // Obtener la URL de la segunda card (cards[1]) utilizando la función getUrl
        const url = parser.getUrl(cards[1]);
        console.log(url);
        expect(url).toContain("https://www.macnificos.com/");
    });

    it("should return a card", async () => {
        const cards = parser.getCards();
        const card = parser.getCard(cards[1]);
        expect(card).toHaveProperty("title");
        expect(card).toHaveProperty("price");
        expect(card).toHaveProperty("url");
        expect(card.price).toBe("199.99");
    });

    it("should return an array of cards", async () => {
        const cards = parser.getCardsArray();
        expect(cards.length).toBe(150);
    });
    
})