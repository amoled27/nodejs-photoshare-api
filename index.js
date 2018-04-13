const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const port = 5000;


//routes

const users = require('./routes/userRoutes');
const images = require('./routes/imageRoutes');

//mongoose connect 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zattabyte-gallery')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//staic folder
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//middleware for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//middleware for method-override
app.use(methodOverride('_method'));

//cors is used incase we make APIs and use them in Angular or any other Front end app
//routes 
app.get('/', function (req, res) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // next();
    res.redirect('/users');
});

//use user routes
app.use('/users', users);

//use image routes
app.use('/images', images);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})