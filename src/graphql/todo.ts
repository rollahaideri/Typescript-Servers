import { MercuriusContext } from "mercurius";
import { extendType, list, nonNull, objectType, stringArg } from "nexus";
import { resolve } from "path";
import { TodoModel } from "../model/TodoModel";

const Todo = objectType({
    name: "Todo",
    description: "A todo object",
    definition(t) {
        t.string("name"),
        t.boolean("completed")
    },
})

export const TodoQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("allTodos", {
            type: list(Todo),
            resolve: async () =>  TodoModel.find()
        })
    },
})

export const TodoMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("addTodo", {
            type: Todo, 
            description: "Add a new todo",
            args: {
                name: nonNull(stringArg({description: "Name of the new todo"}))
            },
            resolve: async(root, {name}, ctx:MercuriusContext) => {
                const newTodo = new TodoModel({name, completed: false})
                return await newTodo.save()

            }
            
        }
        
        )
    },
})