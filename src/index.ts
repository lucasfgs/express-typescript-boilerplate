require("dotenv").config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(helmet());
app.use("/", routes);

app.listen(port, () => console.log(`Server listening at port: ${port}`));
