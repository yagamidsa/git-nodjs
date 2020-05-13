const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MysqlStore = require('express-mysql-session');
const passport = require('passport');

const  { database } =  require('./keys');


// inicializaciones

const app = express();
require('./lib/passport');

//sentings

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');



//middlewares

app.use(session({
    secret: 'ssesionsql',
    resave: false,
    saveUninitialized: false,
    store: new MysqlStore(database)
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//inicializar passport
app.use(passport.initialize());
app.use(passport.session());


//global variables

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;

    next();

});



//rutas

app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/links',require('./routes/links.js'));



//archivos publicos


app.use(express.static(path.join(__dirname,'public')));



//iniciar el servidor

app.listen(app.get('port'),() => {

    console.log('puerto de servidor', app.get('port'));


});



