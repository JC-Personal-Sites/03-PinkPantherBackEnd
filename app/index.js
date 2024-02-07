require('dotenv').config();
require('colors');

const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler'); // Express bespoke error handling
const connectDB = require('./database');

// ========== Addition Security =============== \\
const mongoSanitize = require('express-mongo-sanitize'); 
const helmet = require('helmet'); // HTTP Headers
const xss = require('xss-clean'); // Cross Site Scripting - stop redirection to untrusted location
const rateLimit = require('express-rate-limit');
const hpp = require('hpp'); // HTTP Parameter Pollution attacks
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); // Cross-Origin Resource Sharing - for commincating with web server - trusted routes

// ========== Error Check .env =============== \\
if (
  !('WIKIPEDIA_API' in process.env) ||
  !('MONGODB_URI' in process.env) ||
  !('JC_ALLOWED_ORIGINS_CORS' in process.env)
  // !('MONGODB_URI' in process.env) ||
  // !('JWT_SECRET' in process.env) ||
  // !('JWT_EXPIRYTIME' in process.env) ||
  // !('JWT_FGP_COOKIENAME' in process.env) ||
  // !('JWT_FGP_COOKIE_EXPIRYTIME' in process.env) ||
) {
  console.error('FATAL ERROR: required env vars undefined');
  process.exit(1);
}
// ============================================ \\

const app = express();
const server = require('http').createServer(app);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==== This is all additonal security for the API ==== \\
// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(
  cors({
    origin: process.env.JC_ALLOWED_ORIGINS_CORS,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  })
);

app.disable('x-powered-by');
// ====================================================== \\

// Body Parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(cookieParser());

// connect to DataBase
connectDB();


// ================================================
// Setting Route File variables with there base URL
const rootRoute = require('./_routes/_Root/Root-Routes');
const appendixRoute = require('./_routes/Appendix/Appendix-Routes');
const navBarRoute = require('./_routes/NavBar/NavBar-Routes');
const pictureRoute = require('./_routes/Pictures/Pictures-Routes');
const socialsRoute = require('./_routes/Socials/Socials-Routes');
const videoRoute = require('./_routes/Videos/Videos-Routes');
const userRoute = require('./_routes/Users/Users-Routes');
const wikipediaRoute = require('./_routes/Wikipedia/Wikipedia-Routes');
// ================================================

// ================================================
// Mount Routers
app.use('/', rootRoute);
app.use('/appendix', appendixRoute);
app.use('/navBar', navBarRoute);
app.use('/pictures', pictureRoute);
app.use('/socials', socialsRoute);
app.use('/videos', videoRoute);
app.use('/users', userRoute);
app.use('/wikipedia', wikipediaRoute);
// ================================================

app.use(errorHandler); // Has to go after 'Mountings'

const PORT = process.env.PORT || 8080;
server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold));

