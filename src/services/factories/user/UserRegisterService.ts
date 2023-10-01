import { User } from '@prisma/client'
import { UserRepository } from '@/repositories/user-repository'
import { UserAlreadyExistisError } from '@/services/errors/UserErrors'

interface UserRegisterServiceRequest {
  name: string
  nickname?: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class UserRegisterService {
  constructor(private userRepository: UserRepository) { }

  async execute({ name, nickname, email, password: notHashedPassword }: UserRegisterServiceRequest): Promise<RegisterServiceResponse> {

    const password = notHashedPassword;
    const userExist = await this.userRepository.findByEmail(email)

    if (userExist) {
      throw new UserAlreadyExistisError('Invalid e-mail', 400)
    }

    const user = await this.userRepository.create({ name, nickname, email, password })
    return { user }
  }
}
