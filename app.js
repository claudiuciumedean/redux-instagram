
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connecting to MongoDB
mongoose.connect('mongodb+srv://admin:admin@snapstagramdb-oazuz.mongodb.net/test?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`));

//Importing the model
require('./models/Post');


const express = require('express');
const webpack = require('webpack');

const config = require('./webpack.config.dev');
const compiler = webpack(config);
const routes = require('./routes/index');

const app = express();

//Setting up webpack
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Redirect to routes
app.use('/', routes);

//Start application on PORT 3001
app.listen(3001, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});
