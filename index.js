import express from 'express';
import data from './data/MOCK_DATA.json';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}))

// this is for the public folder on path /
app.use(express.static('public'));

// method to use JSON
//app.use(express.json());
app.use(express.urlencoded({extended: true}));

// this is for image folder on path images
app.use('/images', express.static('images'))

app.get('/', (req, res) => {
    // get data first
    res.json(data) 
});

//JSON Data
// { "hello": "JSON is cool"}
// URLEncoded data
// hello=URLEncoded+is+cool

app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get('/item/:id', (req, res, next) => {
    //this is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(data[user]);
    //everything above is middleware
    res.send(data[user]);
    next();
}, (req, res) => {
    console.log('Did you get the right data?')
});

app.route('/item') 
    .get((req, res) => {
        throw new Error();
        //res.download('images/wormhole.jpg')
        //res.redirect('http://www.linkedin.com')
        //res.end()
        //res.send(`a put request with /item route on port ${PORT}`)
    })
    .put((req, res) => {
        res.send(`a put request with /newItem route on port ${PORT}`)
    })
    .delete((req, res) => {
        res.send(`a delete request with /item route on port ${PORT}`)
    });

//Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red alert! : ${err.stack}`)
});

app.get("/calculator", function(req, res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/calculator", function(req, res){

    let n1 = Number(req.body.v1);
    let n2 = Number(req.body.v2);

    let sum = n1 + n2;

    res.send("The sum of the two number is: " + sum);
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
    console.log(data);
});