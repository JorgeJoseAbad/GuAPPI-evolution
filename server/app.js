require("dotenv").config();
const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const mongoose           = require('mongoose');
const passport           = require('passport');
//const LocalStrategy      = require("passport-local").Strategy;
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const authController     = require("./routes/auth-controller");
const cors               = require('cors');
const index              = require('./routes/index');
const users              = require('./routes/users');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
console.log("connecting to mongo: ");

const app = express();

const passportSetup = require('./config/passport');
passportSetup(passport);

// Passport config
app.use(session({
  secret: "guappi-secret",
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));
app.use(express.static(path.join(__dirname, 'public')));

var whitelist = [
    'http://localhost:4200',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));

require('./routes/index')(app);

//require('./config/passport')(passport);


//var images = require('./public/images');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/public/images/snoopy222.jpg', function(req, res, next) {
  res.sendFile(__dirname + '/public/images/snoopy222.jpg');
  //res.send('respond with a resource');
});

app.get('/public/images/fondoperro.jpg', function(req, res, next) {
  res.sendFile(__dirname + '/public/images/fondoperro.jpg');
  //res.send('respond with a resource');
});


//app.use('/public', users);
app.use('/api',index); //incluyo esto para seguir la ruta
app.use('/', authController);

app.use('/users', users);

app.all('/*', function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
