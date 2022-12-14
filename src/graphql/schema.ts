import { join } from "path";
import { makeSchema } from "nexus";
import { AllTodosSubscription, TodoMutation, TodoQuery } from "./todo";

export const graphSchema = makeSchema({
  types: [TodoQuery, TodoMutation, AllTodosSubscription],
  outputs: {
    typegen: join(__dirname, "generated", "typegen.ts"),
    schema: join(__dirname, "generated", "schema.graphql"),
  },
});
