import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { ChainService } from './chain.service';

describe('ChainService', () => {
  let service: ChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainService, PrismaService],
    }).compile();

    service = module.get<ChainService>(ChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    describe('when chain with id exists', () => {
      it('should return the chain object', async () => {});
    });

    describe('otherwise', () => {
      it('should throw the NotfoundExeptiocn', async () => {});
    });
  });
});
