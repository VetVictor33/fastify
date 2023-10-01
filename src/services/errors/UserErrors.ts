import { ApiError } from "./ApiError";

export class UserAlreadyExistisError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status)
  }
}