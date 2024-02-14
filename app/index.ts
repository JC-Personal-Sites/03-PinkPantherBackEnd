import "colors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./_mongoDB";
import errorHandler from "./middleware/errorHandler"; // Express bespoke error handling

// ---- Routes ----------------------------------
import appendixRoute from "./_routes/PinkPanther/Appendix/Appendix-Routes";
import navBarRoute from "./_routes/PinkPanther/NavBar/NavBar-Routes";
import rootRoute from "./_routes/_Root/Root-Routes";
import pictureRoute from "./_routes/PinkPanther/Pictures/Pictures-Routes";
import socialsRoute from "./_routes/PinkPanther/Socials/Socials-Routes";
import userRoute from "./_routes/PinkPanther/Users/Users-Routes";
import videoRoute from "./_routes/PinkPanther/Videos/Videos-Routes";
import wikipediaRoute from "./_routes/PinkPanther/Wikipedia/Wikipedia-Routes";
// -----------------------------------------------

// ========== Addition Security =============== \\
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"; // Cross-Origin Resource Sharing - for commincating with web server - trusted routes i.e. http://localhost:3000
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet"; // HTTP Headers
import hpp from "hpp"; // HTTP Parameter Pollution attacks
import xss from "xss-clean"; // Cross Site Scripting - stop redirection to untrusted location

// ========== Error Check .env =============== \\
if (
  !("WIKIPEDIA_API" in process.env) ||
  !("MONGODB_URI" in process.env) ||
  !("JC_ALLOWED_ORIGINS_CORS" in process.env)
  // !('MONGODB_URI' in process.env) ||
  // !('JWT_SECRET' in process.env) ||
  // !('JWT_EXPIRYTIME' in process.env) ||
  // !('JWT_FGP_COOKIENAME' in process.env) ||
  // !('JWT_FGP_COOKIE_EXPIRYTIME' in process.env) ||
) {
  console.error("FATAL ERROR: required env vars undefined");
  process.exit(1);
}
// ============================================ \\

const app = express();
app.use(hpp());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
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
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

app.disable("x-powered-by");
// ====================================================== \\

// Body Parser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// connect to DataBase
connectDB();

// ================================================
// Mount Routers
app.use("/", rootRoute);
app.use("/pinkpanther/appendix", appendixRoute);
app.use("/pinkpanther/navBar", navBarRoute);
app.use("/pinkpanther/pictures", pictureRoute);
app.use("/pinkpanther/socials", socialsRoute);
app.use("/pinkpanther/videos", videoRoute);
app.use("/pinkpanther/users", userRoute);
app.use("/pinkpanther/wikipedia", wikipediaRoute);
// ================================================

app.use(errorHandler); // Has to go after 'Mountings'

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold));
