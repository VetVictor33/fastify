import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })
    return user
  }
  async findById(userId: number): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } })
    return user
  }

}