import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from "./models/note";
const app = express();

app.get("/", async (req, res, next) => {
  try {
    //throw Error("Bazinga!");
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
    //res.send("Gello World!");
  } catch (error) {
    next(error);
  }
});
//como no se pasa un parametro cuando no encuentra Rout entra aqui
app.use((req, res, next) => {
  next(Error("pokemon"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
    let error_message = "An unknown error occurred";
    if (error instanceof Error) 
      error_message = error.message;
    res.status(500).json({error: error_message});
  });

export default app;
