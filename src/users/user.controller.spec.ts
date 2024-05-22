import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './user.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user when all required fields are provided', async () => {
    jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prismaService.users, 'create').mockResolvedValue({} as any);

    const userData = {
      cpf: '12345678901',
      password: 'password',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'user',
      branch_company: 'branch',
    };

    await expect(usersService.createUser(userData)).resolves.toBeDefined();
  });

  it('should throw BadRequestException when email already exists', async () => {
    jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue({} as any);

    const userData = {
      cpf: '12345678901',
      password: 'password',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'user',
      branch_company: 'branch',
    };

    await expect(usersService.createUser(userData)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should throw BadRequestException when CPF already exists', async () => {
    jest.spyOn(prismaService.users, 'findUnique').mockResolvedValueOnce(null).mockResolvedValueOnce({} as any);

    const userData = {
      cpf: '12345678901',
      password: 'password',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'user',
      branch_company: 'branch',
    };

    await expect(usersService.createUser(userData)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should throw BadRequestException when CPF length is not 11', async () => {
    const userData = {
      cpf: '1234567890', 
      password: 'password',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'user',
      branch_company: 'branch',
    };

    await expect(usersService.createUser(userData)).rejects.toThrowError(
      BadRequestException,
    );
  });
});
