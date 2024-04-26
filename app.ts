import dotenv from "dotenv";
import express from "express";

import db from "./startups/db";
import routes from "./startups/routes";

const app = express();

dotenv.config();
console.log(`Running in ${process.env.NODE_ENV} mode`);

// database
db();

// route
routes(app);


// listenner
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenning on port ${port}`));
