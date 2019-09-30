const express = require('express');
const axios = require('axios');
require('dotenv').config()
const app = express();

app.get('/api/autocomplete/:query', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const endpoint = `${process.env.ENDPOINT}?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&query=${req.params.query}&beginHighlight=<b>&endHighlight=</b>&country=AUS&maxresults=5`;
    axios({
        method: 'GET',
        url: endpoint,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        res.send(JSON.stringify(response.data));
      }).catch(error => {
        res.send(JSON.stringify(error), 400);
      });
});

app.get('/ping', (req, res) => {
    res.send('pong')
});
app.use('/', express.static('client'))

app.listen(process.env.PORT, () => console.log('Express server is running'));