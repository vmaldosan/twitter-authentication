const express = require('express');
const app = express()
const port = 4000
const passportSetup = require('./config/passport-setup')
const session = require('express-session')
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// set up view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
    console.log('connected to mongo db')
});

// set up routes
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.render('home'))

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`))
