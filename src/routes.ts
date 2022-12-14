import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { LoginController, RegisterController } from "./controller";
import { LoginSchema, RegisterSchema } from "./schemas";

export async function BookRoutes(
  server: FastifyInstance,
  option: FastifyPluginOptions
) {
  server.route({
    method: "POST",
    url: "/login",
    schema: LoginSchema,
    handler: LoginController,
  });

  server.route({
    method: "POST",
    url: "/register",
    schema: RegisterSchema,
    handler: RegisterController,
  });
}
