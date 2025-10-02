import { Injectable } from '@nestjs/common'
import { hashPasswords } from '@src/modules/auth/utils/hash-functions'
import {
  ParamsMissingError,
  UserCreationError,
} from '@src/modules/exceptions/modules/common/user.exceptions'
import { PrismaService } from './prisma.service'
import { User } from '@prisma/client'
import { Create, Update } from '../dto/user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } })
  }

  async findBy({ email }: { email: string }): Promise<User[]> {
    if (!email) throw new ParamsMissingError()
    return await this.prismaService.user.findMany({
      where: {
        ...(email && { email }),
      },
    })
  }

  async create(data: Create): Promise<User> {
    const hashedData = {
      ...data,
      passwordHash: await hashPasswords(data.password),
    }
    try {
      return await this.prismaService.user.create({
        data: hashedData,
      })
    } catch (error) {
      throw new UserCreationError(error)
    }
  }

  async update(id: string, data: Update): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<User> {
    return await this.prismaService.user.delete({ where: { id } })
  }
}
