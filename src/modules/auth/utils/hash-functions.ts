import { compare, hash } from 'bcrypt'

export const hashPasswords = async (password: string): Promise<string> => {
  return await hash(password, 10)
}

export const compareHash = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(password, hashedPassword)
}
