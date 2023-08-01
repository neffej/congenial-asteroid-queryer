const express = require('express');
const path = require('path');
var _ = require('lodash/core') 
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
const bodyParser = require('body-parser')
// const models = require('./models');

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


sequelize.authenticate()
.then(()=> console.log("Database connected..."))
.catch(err => console.log('Error: '+err))

sequelize.sync({ force: false })
.then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});