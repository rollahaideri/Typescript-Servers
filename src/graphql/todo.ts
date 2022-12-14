import { MercuriusContext } from "mercurius";
import {
  extendType,
  list,
  nonNull,
  objectType,
  stringArg,
  subscriptionField,
} from "nexus";
import { resolve } from "path";
import { TodoModel } from "../model/TodoModel";

const Todo = objectType({
  name: "Todo",
  description: "A todo object",
  definition(t) {
    t.string("name"), t.boolean("completed");
  },
});

export const TodoQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("allTodos", {
      type: list(Todo),
      resolve: async () => TodoModel.find(),
    });
  },
});

export const TodoMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addTodo", {
      type: Todo,
      description: "Add a new todo",
      args: {
        name: nonNull(stringArg({ description: "Name of the new todo" })),
      },
      resolve: async (root, { name }, ctx: MercuriusContext) => {
        const newTodo = await new TodoModel({ name, completed: false }).save();

        ctx.pubsub.publish({
          topic: "TODO_CHANGED",
          payload: newTodo,
        });
        return newTodo;
      },
    });
  },
});

export const AllTodosSubscription = subscriptionField("subscribeAllTodos", {
  type: nonNull(Todo),
  description: "Subscribe to changes on all Todos",
  subscribe: async (root, args, ctx: MercuriusContext) => {
    return await ctx.pubsub.subscribe("TODO_CHANGED");
  },
  resolve: async (payload) => payload,
});
