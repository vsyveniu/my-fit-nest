import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOneById(id: number): Promise<string> {
    console.log(id);
    return 'daymn';
  }
}
