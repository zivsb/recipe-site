const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

// const helmet = require('helmet');
// app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Retrieving the posts from the json file
const posts = JSON.parse(fs.readFileSync('posts.json'));
console.log(posts);

function storePosts() {
    fs.writeFileSync('posts.json', JSON.stringify(posts));
    return ("Successfully stored: ", posts);
}

app.get('/', (req, res, next)=> {
    res.render('home', {
        showPosts: posts.slice(1).slice(-5)
    });
})

app.get('/add-recipe', (req, res, next) => {
    res.render('addRecipe');
})

app.get('/recipe/:i', (req, res, next) => {
    console.log(req.params.i);
    res.render('recipe', posts[req.params.i]);
})

app.post('/add-recipe', (req, res, next) => {
    console.log(req.body);
    posts.push({
        "i": posts.length,
        "name": req.body.recipeName,
        "ingredients": req.body.ingredients,
        "instructions": req.body.instructions,
        "creator": req.body.creator
    });

    storePosts();

    res.redirect('/');
})

// A post request for me to run to save the data
// Run this before shutting down server
app.post('/save', (req, res, next)=> {
    
})

app.listen(3000);
console.log("Recipe Site is listening on port 3000");