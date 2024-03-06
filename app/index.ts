import "colors";
import "dotenv/config";
import express from "express"; // node js frameworked used to build out applications
import morgan from "morgan"; // logs to the console http resquests
import connectDB from "./_mongoDB"; // mongo DB connection
import errorHandler from "./middleware/errorHandler"; // Express bespoke error handling

// ---- Routes ----------------------------------
import appendixRoute from "./_routes/PinkPanther/Appendix/Appendix-Routes";
import authenticationRoute from "./_routes/PinkPanther/Authentication/Authentication-Routes";
import navBarRoute from "./_routes/PinkPanther/NavBar/NavBar-Routes";
import rootRoute from "./_routes/_Root/Root-Routes";
import pictureRoute from "./_routes/PinkPanther/Pictures/Pictures-Routes";
import roleRoute from "./_routes/PinkPanther/Roles/Roles-Routes";
import socialsRoute from "./_routes/PinkPanther/Socials/Socials-Routes";
import userRoute from "./_routes/PinkPanther/Users/Users-Routes";
import videoRoute from "./_routes/PinkPanther/Videos/Videos-Routes";
import wikipediaRoute from "./_routes/PinkPanther/Wikipedia/Wikipedia-Routes";
// -----------------------------------------------

// ========== Addition Security =============== \\
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; // Parse Cookie header and populate req.cookies
import cors from "cors"; // Cross-Origin Resource Sharing - for commincating with web server - trusted routes i.e. http://localhost:3000
import mongoSanitize from "express-mongo-sanitize"; // NoSql injection attacks
import rateLimit from "express-rate-limit"; // prevents the IP requesting multiple times - brut force attack
import helmet from "helmet"; // HTTP Headers
import hpp from "hpp"; // HTTP Parameter Pollution attacks

// ========== Error Check .env =============== \\
if (
  !("WIKIPEDIA_API" in process.env) ||
  !("MONGODB_URI" in process.env) ||
  !("JC_ALLOWED_ORIGINS_CORS" in process.env)
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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ==== This is all additonal security for the API ==== \\
// Params Pollution
app.use(hpp());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

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
app.use("/pinkpanther/authentication", authenticationRoute);
app.use("/pinkpanther/appendix", appendixRoute);
app.use("/pinkpanther/navBar", navBarRoute);
app.use("/pinkpanther/pictures", pictureRoute);
app.use("/pinkpanther/roles", roleRoute);
app.use("/pinkpanther/socials", socialsRoute);
app.use("/pinkpanther/videos", videoRoute);
app.use("/pinkpanther/users", userRoute);
app.use("/pinkpanther/wikipedia", wikipediaRoute);
// ================================================

app.use(errorHandler); // Has to go after 'Mountings'

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold);
});

process.on("unhandledRejection", (err: any, promise: any) => {
  console.log(`Database Error: ${err.message}`);
  // Close Server and Exit
  server.close(() => process.exit(1));
});
