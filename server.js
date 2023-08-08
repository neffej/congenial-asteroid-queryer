const express = require('express');
const session = require("express-session")
const path = require('path');
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
// const models = require('./models');

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 60 * 60 * 1000,
		httpOnly: true,
		secure: false,
		sameSite: "strict",
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess))

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


sequelize.authenticate()
.then(()=> console.log("Database connected..."))
.catch(err => console.log('Error: '+err))

sequelize.sync({ force: true })
.then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});
