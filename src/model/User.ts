import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";


const UserSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

})

export const User = model<IUser>("User", UserSchema)