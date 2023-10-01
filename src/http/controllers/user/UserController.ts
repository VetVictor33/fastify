import { makeRegisterServe } from '@/services/factories/user/make-register-user';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod';

export abstract class UserController {
  static async sayHi(request: FastifyRequest, reply: FastifyReply) {
    reply.status(200).send({ hello: 'world!' });
  }

  static async register(request: FastifyRequest, reply: FastifyReply) {
    const registerUserSchema = z.object({
      name: z.string(),
      nickname: z.string().optional(),
      email: z.string(),
      password: z.string()
    })

    const { name, nickname, email, password } = registerUserSchema.parse(request.body)

    const registerService = makeRegisterServe()
    await registerService.execute({ name, nickname, email, password })

    return reply.status(201).send()
  }
}