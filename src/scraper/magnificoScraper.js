import puppeteer from "puppeteer"

class MagnificoScraper {
    constructor(headless = true) {
        this.browser = null;
        this.page = null;
        this.headless = headless;
        //this.serchBarId = "#edit-keyword"
        this.baseURL = new URL("https://www.macnificos.com/search/")
    }

    init = async () => {
        this.browser = await puppeteer.launch({ headless: this.headless, args: ['--no-sandbox'] });
        this.page = await this.browser.newPage();
    }

    close = async () => {
        await this.browser.close()
    }

    /*  scrap = async (url) => {
         await this.page.goto(url)
         await this.page.waitForSelector(this.serchBarId);
         await this.page.type(this.serchBarId, "monitor");
         await this.page.keyboard.press("Enter");
         await new Promise(resolve => setTimeout(resolve, 15000));
         const content = await this.page.content();
         console.log(content);
         return content;
     } */

    scrap = async (query) => {

        //this.baseURL.searchParams.set("", query)
        // const url = this.baseURL.toString();
        const url = this.baseURL + query;
        await this.page.goto(url)

        await new Promise(resolve => setTimeout(resolve, 30000));
        const content = await this.page.content();

        // Hacer clic en el botón varias veces
        const numberOfClicks = 2;
        for (let i = 0; i < numberOfClicks; i++) {
            await this.page.click("#facets_pager");
            await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar 3 segundos entre cada clic.
        }

        // console.log(content);
        return content;
    }


    multiScrap = async (query) => {
        let content = "";
        for (let i = 1; i <= pages; i++) {
            content += await this.scrap(query, i);
        }
        return content;
    }



}

export default MagnificoScraper;