import Scraper from "../../src/scraper/MagnificoScraper.js";

describe("Scraper ", () => {

    let scraper;

    beforeAll(async () => {
        scraper = new Scraper(false);
        await scraper.init();
    }
    )

    afterAll(async () => {
        await scraper.close();
    }
    )

    it("should return a string", async () => {
        // let url = "https://www.macnificos.com/"
        let query = "monitor"
        const content = await scraper.scrap(query);
        expect(content).toContain("<title>")
    }, 30000
    );
}
)