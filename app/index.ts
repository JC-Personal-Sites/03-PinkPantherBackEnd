import "colors";
import "dotenv/config";
import express from "express"; // node js frameworked used to build out applications
import morgan from "morgan"; // logs to the console http resquests
import connectDB from "./_mongoDB"; // mongo DB connection
import errorHandler from "./middleware/errorHandler"; // Express bespoke error handling

// ---- Routes ----------------------------------
import rootRoute from "./_routes/_Root/Root-Routes";
import ppAppendixRoute from "./_routes/PinkPanther/Appendix/Appendix-Routes";
import ppAuthenticationRoute from "./_routes/PinkPanther/Authentication/Authentication-Routes";
import ppNavBarRoute from "./_routes/PinkPanther/NavBar/NavBar-Routes";
import ppPictureRoute from "./_routes/PinkPanther/Pictures/Pictures-Routes";
import ppRoleRoute from "./_routes/PinkPanther/Roles/Roles-Routes";
import ppSocialsRoute from "./_routes/PinkPanther/Socials/Socials-Routes";
import ppUserRoute from "./_routes/PinkPanther/Users/Users-Routes";
import ppVideoRoute from "./_routes/PinkPanther/Videos/Videos-Routes";
import ppWikipediaRoute from "./_routes/PinkPanther/Wikipedia/Wikipedia-Routes";
import dottAppendixRoute from "./_routes/DayOfTheTentacle/Appendix/Appendix-Routes";
import dottAuthenticationRoute from "./_routes/DayOfTheTentacle/Authentication/Authentication-Routes";
import dottNavBarRoute from "./_routes/DayOfTheTentacle/NavBar/NavBar-Routes";
import dottPictureRoute from "./_routes/DayOfTheTentacle/Pictures/Pictures-Routes";
import dottRoleRoute from "./_routes/DayOfTheTentacle/Roles/Roles-Routes";
import dottSocialsRoute from "./_routes/DayOfTheTentacle/Socials/Socials-Routes";
import dottUserRoute from "./_routes/DayOfTheTentacle/Users/Users-Routes";
import dottVideoRoute from "./_routes/DayOfTheTentacle/Videos/Videos-Routes";
import dottWikipediaRoute from "./_routes/DayOfTheTentacle/Wikipedia/Wikipedia-Routes";
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
  !("JWT_SECRET" in process.env) ||
  !("JWT_EXPIRYTIME" in process.env) ||
  !("JWT_FGP_COOKIENAME" in process.env) ||
  !("COOKIE_HTTPONLY" in process.env) ||
  !("COOKIE_SECURE" in process.env) ||
  // !("COOKIE_SAMESITE" in process.env) || // I have had to comment this out as currently honested in different locations
  !("COOKIE_MAXAGE" in process.env) ||
  !("JC_ALLOWED_ORIGINS_CORS" in process.env)
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
    allowedHeaders: ["userCsrf", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    exposedHeaders: ["userCsrf"],
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
app.use("/pinkpanther/authentication", ppAuthenticationRoute);
app.use("/pinkpanther/appendix", ppAppendixRoute);
app.use("/pinkpanther/navBar", ppNavBarRoute);
app.use("/pinkpanther/pictures", ppPictureRoute);
app.use("/pinkpanther/roles", ppRoleRoute);
app.use("/pinkpanther/socials", ppSocialsRoute);
app.use("/pinkpanther/videos", ppVideoRoute);
app.use("/pinkpanther/users", ppUserRoute);
app.use("/pinkpanther/wikipedia", ppWikipediaRoute);
app.use("/pinkpanther/authentication", dottAuthenticationRoute);
app.use("/pinkpanther/appendix", dottAppendixRoute);
app.use("/pinkpanther/navBar", dottNavBarRoute);
app.use("/pinkpanther/pictures", dottPictureRoute);
app.use("/pinkpanther/roles", dottRoleRoute);
app.use("/pinkpanther/socials", dottSocialsRoute);
app.use("/pinkpanther/videos", dottVideoRoute);
app.use("/pinkpanther/users", dottUserRoute);
app.use("/pinkpanther/wikipedia", dottWikipediaRoute);
// ================================================

app.use(errorHandler); // Has to go after 'Mountings'

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold);
});

process.on("unhandledRejection", (err: any, promise: any) => {
  console.error(`Database Error: ${err.message}`);
  // Close Server and Exit
  server.close(() => process.exit(1));
});
