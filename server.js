const express = require('express');
const path = require('path');
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;
// const models = require('./models');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/index.js'));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});