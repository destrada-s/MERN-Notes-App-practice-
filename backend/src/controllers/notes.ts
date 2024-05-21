import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";


export const get_notes: RequestHandler = (async (req, res, next) => {
    try {
      //throw createHttpError(401);
      const notes = await NoteModel.find().exec();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  });

  export const get_note: RequestHandler = (async (req, res, next) => {
    try {
      const note_id = req.params.note_id;

      if(!mongoose.isValidObjectId(note_id))
      {
        throw createHttpError(400, "Invalid note id");
      }
      const note = await NoteModel.findById(note_id).exec();
      if (!note) {
        throw createHttpError(404, "Note not found");
      }
      res.status(200).json(note);
    }
    catch (error)
    {
      next(error);
    }
  });

  interface create_note_body {
    title? : string,
    text?  : string,
  }

  export const create_note: RequestHandler<unknown, unknown, create_note_body, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    try {
         if (!title) {
          throw createHttpError(400, "Note must have a title");
        }
        const new_note = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(new_note);
    } catch (error)
    {
        next(error);
    }
  };

interface update_note_params {
	note_id: string
}

interface update_note_body {
	title?: string,
	text?: string,
}

  export const update_note: RequestHandler<update_note_params, unknown, update_note_body, unknown> = async(req, res, next) => {
	const note_id = req.params.note_id;
	const new_title = req.body.title;
	const new_text = req.body.text;
	try {
		if(!mongoose.isValidObjectId(note_id))
			throw createHttpError(400, "Invalid note id");
		if (!new_title) 
			throw createHttpError(400, "Note must have a title");

		const note = await NoteModel.findById(note_id).exec();
		if (!note) 
		  throw createHttpError(404, "Note not found");
		note.title = new_title;
		note.text = new_text;

		const updated_note = await note.save();
		res.status(200).json(updated_note);
	}
	catch (error)
	{
		next(error);
	}
  };

  export const delete_note: RequestHandler = async(req, res, next) => {
	const note_id = req.params.note_id;
    try {
        if (!mongoose.isValidObjectId(note_id)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(note_id).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await note.deleteOne();
		res.sendStatus(204);
	}
	catch (error) {
		next(error);
	}
  };