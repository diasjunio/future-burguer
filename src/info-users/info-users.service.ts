import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInfoUserDto } from './dto/create-info-user.dto';
import { UpdateInfoUserDto } from './dto/update-info-user.dto';

@Injectable()
export class InfoUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id_user: string, data: CreateInfoUserDto) {
    // Verifica se já existe um registro na tabela UsersDTO para o id_user fornecido
    const existingUserDTO = await this.prisma.usersDTO.findFirst({
      where: { id_user },
    });

    if (existingUserDTO) {
      throw new BadRequestException(`Já existe um registro na tabela UsersDTO associado ao id_user '${id_user}'. Use o método update para editar os campos.`);
    }

    // Cria o registro na tabela UsersDTO associado ao usuário especificado
    return this.prisma.usersDTO.create({
      data: {
        ...data,
        id_user, // Define o ID do usuário na tabela UsersDTO
      },
    });
  }

  async update(id_dto: string, data: UpdateInfoUserDto) {
    // Verifica se o UsersDTO existe
    const existingUserDTO = await this.prisma.usersDTO.findUnique({
      where: { id_dto },
    });

    if (!existingUserDTO) {
      throw new BadRequestException(`UsersDTO com ID '${id_dto}' não encontrado.`);
    }

    return this.prisma.usersDTO.update({
      where: { id_dto },
      data,
    });

  }
  async delete(id_dto: string) {
    // Verifica se existe um registro na tabela UsersDTO associado ao id_user fornecido
    const existingUserDTO = await this.prisma.usersDTO.findFirst({
      where: { id_dto },
    });

    if (!existingUserDTO) {
      throw new BadRequestException(`Não existe nenhum registro na tabela UsersDTO associado ao id_user '${id_dto}'.`);
    }

    // Exclui o registro na tabela UsersDTO associado ao id_user fornecido
    return this.prisma.usersDTO.delete({
      where: { id_dto },
    });
  }
}