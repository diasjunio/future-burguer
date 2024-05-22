import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from '.prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(userData: Omit<Users, 'id' | 'createdAt' | 'updatedAt'> & { createdAt?: Date, updatedAt?: Date }): Promise<Users> {
    const requiredFields = ['name', 'email', 'role', 'cpf', 'branch_company'];
    for (const field of requiredFields) {
      if (!(field in userData)) {
        throw new BadRequestException(`Campo '${field}' é obrigatório.`);
      }
    }

    const existingEmail = await this.prisma.users.findUnique({
      where: { email: userData.email },
    });
    if (existingEmail) {
      throw new BadRequestException(
        `E-mail '${userData.email}' já está cadastrado.`,
      );
    }

    const existingCPF = await this.prisma.users.findUnique({
      where: { cpf: userData.cpf },
    });
    if (existingCPF) {
      throw new BadRequestException(
        `CPF '${userData.cpf}' já está cadastrado.`,
      );
    }

    if (userData.cpf.length !== 11) {
      throw new BadRequestException('CPF inválido. Deve conter 11 dígitos.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return this.prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    
  }

  async findAllUsers(): Promise<Users[]> {
    const users = await this.prisma.users.findMany();

    if (users.length === 0) {
      throw new BadRequestException('Nenhum usuário encontrado.');
    }

    return users;
  }

  async findUserById(id: string): Promise<Users | null> {

    if (!id) {
      throw new BadRequestException('ID inválido.');
    }

    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    if (!email) {
      throw new BadRequestException('ID inválido.');
    }

    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return user;
  }

  async updateUser(
    id: string,
    userData: Partial<Users>,
  ): Promise<{ message: string; user: Users } | null> {
    if (!id) {
      throw new BadRequestException('ID inválido.');
    }
    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    if ('cpf' in userData) {
      throw new BadRequestException('O CPF não pode ser alterado.');
    }
    if ('email' in userData && userData.email !== existingUser.email) {
      const emailExists = await this.prisma.users.findUnique({
        where: { email: userData.email },
      });
      if (emailExists) {
        throw new BadRequestException(`E-mail '${userData.email}' já está cadastrado.`);
      }
    }

    const allowedFields = ['password', 'email', 'name', 'role'];
    const updatedData: Partial<Users> = {};

    for (const key of allowedFields) {
      if (key in userData) {
        updatedData[key] = userData[key];
      }
    }

    const hasChanges = Object.keys(updatedData).length > 0;
    if (!hasChanges) {
      return { message: 'Nenhuma alteração realizada.', user: existingUser };
    }

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: updatedData,
    });

    return { message: 'Usuário atualizado com sucesso.', user: updatedUser };
  }


  async deleteUser(id: string): Promise<Users | null> {
    if (!id) {
      throw new BadRequestException('Por favor, forneça um ID.');
    }

    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new BadRequestException(`Usuário com o ID '${id}' não encontrado.`);
    }

    const deletedUser = await this.prisma.users.delete({
      where: { id },
    });

    return deletedUser;
  }

}