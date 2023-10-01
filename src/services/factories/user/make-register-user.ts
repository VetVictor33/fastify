import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UserRegisterService } from "./UserRegisterService";

export function makeRegisterServe() {
  const userRepository = new PrismaUserRepository();
  const service = new UserRegisterService(userRepository);
  return service
}