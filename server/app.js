import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import handlerFunction from "./controller.js"

const app = express();
const port = "1088";


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "ssshhhhh",
    saveUninitialized: true,
    resave: false,
  })
);

app.post(`/addUser`,handlerFunction.addUser)
app.get(`/getUserInfo`,handlerFunction.getUserInfo)

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);


// controller 