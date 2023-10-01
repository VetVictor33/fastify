import { FastifyInstance } from "fastify";
import { UserController as user } from "./UserController";


export abstract class UserRouter {
  static async routes(app: FastifyInstance) {
    app.get('/', user.sayHi);
    app.post('/signup', user.register);
  }
}