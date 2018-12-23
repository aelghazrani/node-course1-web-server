const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

//register hbs helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperText', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {

    //res.send('<h2>Bonjour Express !</h2>');
    res.render('home.hbs',{
        pageTitle: 'Home page'        
    });

});

app.get('/about', (req, res) => {

    res.render('about.hbs',{
        pageTitle: 'About page'        
    });

});


app.listen(8091, () => {
    console.log('Server is up on port : 8091');
});