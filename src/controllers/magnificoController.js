import MaginificoScrapers from '../scraper/magnificoScraper.js';
import MaginificoParser from '../parser/magnificoParser.js';
import Producto from "../models/producto.js";

class MaginificoController {
    constructor(headless = true) {
        this.scrapers = new MaginificoScrapers(headless);
        this.parser = null;
    }

    init = async () => {
        await this.scrapers.init();
    }

    getData = async (query) => {
        //const content = await this.scraper.multiScrap(query);
       // this.parser = new NeoParser(content);
        
        this.parser = new MaginificoParser();
        const cards = this.parser.getCardsArray();
        console.log(cards);
        this.saveData(query,cards);
        this.close();
        return cards;
    }

    saveData = async (query,cards) => {
        for(let card of cards){
            try{
                card.shop = "magnifico"; 
                card.query = query; 
                const producto = new Producto(card);
                await producto.save();
            }
            catch(e){
                console.log(e);
            }
        }
    }

    close = async () => {
        await this.scraper.close();
    }

}

export default MaginificoController;