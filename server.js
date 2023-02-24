const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error'); // Express bespoke error handling
const connectDB = require('./config/db');

// ========== Addition Security =============== \\
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
// ============================================ \\

dotenv.config({ path: './config/config.env' });
const app = express();

//dev - response check
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// ==== This is all additonal security for your API ==== \\
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
app.use(cors());
// ====================================================== \\

// Body Parser
app.use(express.json()); // This is needs as we are passing JSON data around

// connect to DataBase
connectDB();

// ================================================
// Setting Route File variables with there base URL
const appendixRoute = require('./_routes/Appendix/Appendix-Routes');
const pictureRoute = require('./_routes/Picture/Picture-Routes');
const videoRoute = require('./_routes/Video/Video-Routes');
const userRoute = require('./_routes/Users/User-Routes');
// ================================================

// ================================================
// Mount Routers
app.use('/appendix', appendixRoute);
app.use('/picture', pictureRoute);
app.use('/video', videoRoute);
app.use('/user', userRoute);
// ================================================

app.use(errorHandler); // Has to go after 'Mountings'

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold));
