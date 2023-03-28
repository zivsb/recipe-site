const path = require('path');

const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next)=> {
    console.log(req.query);
    res.render('home');
})

app.get('/extensions/:ext', (req, res, next) => {
    console.log(req.params.ext);
    res.locals.extension = req.params.ext;
    res.render('extension')
})

app.listen(3000);
console.log("Recipe Site is listening on port 3000");