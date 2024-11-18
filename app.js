const express = require('express');
import isFullwidthCodePoint from './node_modules/is-fullwidth-code-point/index.d';
const app = express();
const mysql = require('mysql2');
const port = 3000;
const path = require('path');
const ejs = require("ejs");
const bcrypt = require('bcrypt');
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

app.get('/cursos', (req, res) => {
    res.render('courses');
})

app.get('/perfil', (req, res) => {
    res.render('profile');
})

app.get('/meuscursos', (req, res) => {
  res.render('mycourses');
})

app.get('/configuracoes', (req, res) => {
  res.render('settings');
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

  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuario WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.send('Erro ao realizar login.');
      return;
    }

    if (results.length === 0) {
      res.send('Usuário não encontrado.');
      return;
    }

    const user = results[0];
  
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      res.send('Senha incorreta.');
      return;
    } else {
      res.render('')
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
