import fastify from "fastify";
import { UserRouter } from "./http/controllers/user/routes";
import cors from '@fastify/cors';
import { env } from "./env";
import { ZodError } from "zod";
import { ApiError } from "./services/errors/ApiError";

export const app = fastify();

app.register(cors, { origin: true });

app.register(UserRouter.routes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  } else if (error instanceof ApiError) {
    return reply.status(error.status).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // ToDo: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})