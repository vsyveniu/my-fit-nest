import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chain } from '@prisma/client';
import workouts from 'prisma/seeds/workouts';

@Injectable()
export class ChainService {
  constructor(private prismaService: PrismaService) {}

  async get(id: number): Promise<Chain[]> {
    return this.prismaService.chain.findMany({
      where: { userId: id },
      include: {
        days: {
          include: {
            workouts: true,
          },
        },
      },
      orderBy: { isActive: 'desc' },
    });
  }
}
