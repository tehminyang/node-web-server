const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('error logging');
        }
    })
    next();
})

// No code is run after this middleware
// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to my website!'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page',
        message: 'A list of the different projects I worked on to learn full stack engineering.'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error handling request.'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});