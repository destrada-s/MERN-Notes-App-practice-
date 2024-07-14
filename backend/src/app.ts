import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes"
import userRoutes from "./routes/users"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validate_env";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:60*60*100,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING
  })
}));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//como no se pasa un parametro cuando no encuentra Rout entra aqui
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found")); // Pass the error to the next middleware
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let error_message = "An unknown error occurred";
    let status_code = 500;
    let default_error = 0;
    if (error instanceof Error)
    {
      default_error = 1;
    }
    if (isHttpError(error)) 
    {
      default_error = 0
      status_code = error.status;
      error_message = error.message;
    }
    if (default_error == 0)
      res.status(status_code).json({error: error_message});
    else
      res.status(status_code).json({error: error});
  });

export default app;
