// when do an nmp i @types it ussually saves this types of files in the node_modules folder
import mongoose from "mongoose";

declare module "express-session" {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}