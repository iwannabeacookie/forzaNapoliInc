const express = require('express');
const collection = require("./mangodb");
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req,res) => {

  const data = {
    name: req.body.username,
    password: req.body.password
  }

  /* what would be the code
  const userdata = await collection.InsertMany(data);
  */

  //fake code just to show
  res.render('test', { data: data })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});