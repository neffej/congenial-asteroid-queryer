const express = require('express');
const path = require('path');
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
// const models = require('./models');

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});