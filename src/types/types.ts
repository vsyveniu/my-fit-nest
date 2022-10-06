import { User } from 'prisma/prisma-client';
import { Request } from '@nestjs/common';

export type UserAuth = Partial<User> & {
  authorization?: {
    access: string;
    refresh: string;
  };
};

export type RequestWithId = Request & {
  userId: string;
};

export type JwtUser = {
  userId: number;
};

export enum workoutTypes {
  FREE = 'Free',
  STRENGHT = 'Strenght',
  ENDURANCE = 'Endurance',
  AERO = 'Aero',
  CYCLING = 'Cycling',
}
