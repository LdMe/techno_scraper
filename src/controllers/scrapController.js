import AmazonController from "./amazonController.js";
import NeoController from "./neoController.js";
import Producto from "../models/producto.js";
import MagnificoController from "./magnificoController.js";

class ScrapController {
    constructor (){
        this.amazonController = new AmazonController();
        this.neoController = new NeoController();
        this.MagnificoController = new MagnificoController();


    }

    init = async () => {
        await this.amazonController.init();
        await this.neoController.init();
        await this.MagnificoController.init();
    }

    getData = async (query, pages) => {
        let content = await this.amazonController.getData(query, pages);
        content = content.concat(await this.neoController.getData(query));
        const magnificoData = await this.MagnificoController.getData(query);
        content = content.concat(magnificoData);
        return content;
    }

    getDataFromDB = async (req,res) => {
        let data = [];
        let query = req.query.query;
        if(query){
            try {
                data = await Producto.find({
                    $or:[
                        {title: {$regex: query, $options: "i"}},
                        {price: {$regex: query, $options: "i"}},
                        {shop: {$regex: query, $options: "i"}},
                        {query: {$regex: query, $options: "i"}}
                    ]});
            }catch(e){
                console.log(e);
            }
        }
        res.render("index", {data: data});
    }
        

}

export default ScrapController;