const express = require('express');
const app = express();
const port = 3000;
const ejs = require("ejs");
const bodyParser = require("body-parser");


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/cursos', (req, res) => {
    res.render('courses');
})

app.get('/perfil', (req, res) => {
    res.render('profile');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
