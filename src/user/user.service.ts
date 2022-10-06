import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUnique(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async create(userDto: UserDto): Promise<User | HttpException> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...userDto,
        },
      });
      return user;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new HttpException(`users's phone already exists`, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(`error in user create ${e?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
