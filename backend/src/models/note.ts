import { InferSchemaType, Schema, model } from "mongoose";

const note_schema = new Schema({
    title: { type: String, required: true }, 
    text: { type: String },
}, { timestamps: true });

type Note = InferSchemaType<typeof note_schema>;

export default model<Note>("Note", note_schema);
