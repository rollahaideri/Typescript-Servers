import { FastifyReply, FastifyRequest } from "fastify";
import { request } from "http";
import { IUser, LoginRequest } from "./interfaces";
import validateEmail from "./utils/validateEmail";

export async function LoginController(
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
) {
  console.log(request.body);
}

export async function RegisterController(
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) {
  try {
    const isEmailValid = validateEmail(request.body.email);

    if (!isEmailValid) {
      reply.code(400).send("Invalid email adress!");
      return;
    }

    const { User } = request.db.models;

    const existsUser = await User.findOne({ email: request.body.email });

    if (existsUser) {
      reply.code(400).send("User already exist");
    }

    await User.create(request.body);

    reply.status(201);
    return {
      success: true,
      message: "Successfuly registered user",
    };
  } catch (error) {
    await reply.status(500).send("An error accured");
  }
}
