const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;
const path = require('path');
const ejs = require("ejs");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'careacademy'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/logado', (req, res) => {
  res.render('homel');
})

app.get('/cursos', (req, res) => {
    res.render('courses');
})


app.get('/perfil', (req, res) => {
    res.render('profile');
})

app.get('/meuscursos', (req, res) => {
  res.render('mycourses');
})

app.get('/registro', (req, res) => {
  res.render('signup');
})


app.post('/submit', async (req, res) => {
  const { nome, email, senha } = req.body;

  const hashedPassword = await bcrypt.hash(senha, 10);

  const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco:', err);
      res.send('Erro ao inserir os dados no banco.');
      return;
    }
    res.send('Dados inseridos com sucesso!');
  });
});

app.get('/login', (req, res) => {
  res.render('login');
})


app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const queryLogin = 'SELECT * FROM usuario WHERE email = ?';
  
    if (senha == queryLogin) {
      res.send('Senha correta.');
      return;
    } else {
      res.send('Senha incorreta')
    }
});

app.get('/curso-de-excel-para-iniciantes', (req, res) => {
  res.render('morecourse1');
})

app.get('/curso-de-introducao-ao-word', (req, res) => {
  res.render('morecourse2');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
