const express = require('express');
const cors = require('cors')
const bodyParser =  require('body-parser')

const { routes } = require('./routes');



const app = express();


const PORT = 5000;

app.use(cors())
app.listen(PORT);

console.log("Server is running on the port: " + PORT);

app.get('/ping', (req, res) => res.json("pong"));

app.use(bodyParser.urlencoded(
    {extended:true}
))
app.use(bodyParser.json());
app.use(routes);
