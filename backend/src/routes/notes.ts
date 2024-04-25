import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/", NotesController.get_notes);
router.get("/:note_id", NotesController.get_note);
router.post("/", NotesController.create_note);
export default router;