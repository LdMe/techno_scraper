import express from 'express';

import AmazonController from './controllers/amazonController.js';
import XtremController from './controllers/xtremController.js';

const app = express();


app.get('/', async (req, res) => {
    const amazonController = new AmazonController();
    await amazonController.init();
    let query  = req.query.query;
    let pages = 4;
    const content = await amazonController.getData(query, pages);
    res.send(content);
    }
);
app.get('/xtrem', async (req, res) => {
    const xtremController = new XtremController(false);
    await xtremController.init();
    const content = await xtremController.getData(req.query.search);
    res.send(content);
})
app.listen(3003, () => {
    console.log('Example app listening on port 3003!');
    }
);