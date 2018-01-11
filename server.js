const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); // Set various express configurations

app.use((req, res, next) => {
  // MIDDLEWARE
  var now = new Date().toString();
  // next - when middleware function is done

  var log = `${now}:${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();
  // Avoid calling next
  // logger when some one logs
  // new view - maintenance.hbs - copy from home - will be right back
  // new middleware
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public')); // register middleware
// right header set, api token
// respond to a request

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });  
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad res.send json data with errorMessage
app.get('/bad',(req, res) => {
  res.send({
    errorMessage:'Unable to handle request!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});