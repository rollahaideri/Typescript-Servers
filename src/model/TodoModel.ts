import { model, Schema } from "mongoose";


const todoSchema = new Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, required: true},
    
})

export const TodoModel = model("Todo", todoSchema)