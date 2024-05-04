const express = require('express');
const usercollection = require('./mangodb');
const crypto = require("crypto");
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/login', async (req, res) => {


  const check = await usercollection.findOne({ name: req.body.username });
  if (!check) {
    //todo
    res.send("account not found");
  }

  //check password
  if (req.body.password == check.password){
    res.render('test', { data: check })
  } else {
    res.send("the password is wrong");
  }

})

app.post('/signup', async (req, res) => {

  const data = {
    name: req.body.username,
    password: req.body.password
  }

  //check if exist
  const check = await usercollection.findOne({ name: data.name });
  if (check) {
    //todo
    res.send("found");
  } else {

    //hash the password

    const userdata = await usercollection.insertMany(data);
  }



  //fake code just to show
  res.render('test', { data: data })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});