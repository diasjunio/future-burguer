import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateInfoUserDto } from './dto/create-info-user.dto';
import { CreateInfoUserPart1Dto } from './dto/create-info-user-part1.dto';
import { UpdateInfoUserDto } from './dto/update-info-user-part2.dto';
import { CreateInfoUserPart2Dto } from './dto/create-info-user-part2.dto';

@Injectable()
export class InfoUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createPart1(id_user: string, data: CreateInfoUserPart1Dto) {
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

  async createPart2(id_dto1: string, data: CreateInfoUserPart2Dto) {
    // Verifica se já existe um registro na tabela UsersDTO2 para o id_dto1 fornecido
    const existingUserDTO2 = await this.prisma.usersDTO2.findFirst({
      where: { id_dto1 },
    });

    if (existingUserDTO2) {
      throw new BadRequestException(`Já existe um registro na tabela UsersDTO2 associado ao id_dto1 '${id_dto1}'. Use o método update para editar os campos.`);
    }

    // Cria o registro na tabela UsersDTO2 associado ao id_dto1 especificado
    return this.prisma.usersDTO2.create({
      data: {
        ...data,
        id_dto1, // Define o ID do usuário na tabela UsersDTO2
      },
    });
  }



  async updatePart1(id_dto: string, data: CreateInfoUserPart1Dto) {
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


    async updatePart2(id_dto2 : string, data: CreateInfoUserPart2Dto) {
      // Verifica se o UsersDTO existe
      const existingUserDTO = await this.prisma.usersDTO2.findUnique({
        where: { id_dto2   },
      });
  
      if (!existingUserDTO) {
        throw new BadRequestException(`UsersDTO com ID '${id_dto2 }' não encontrado.`);
      }
  
      return this.prisma.usersDTO2.update({
        where: { id_dto2 },
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
  async getUserInfo(id_user: string) {
    // Busca o usuário na tabela Users
    const user = await this.prisma.users.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      throw new BadRequestException(`Usuário com ID '${id_user}' não encontrado.`);
    }

    // Busca as informações na tabela UsersDTO usando o id_user
    const userDTO = await this.prisma.usersDTO.findFirst({
      where: { id_user },
    });

    if (!userDTO) {
      throw new BadRequestException(`Informações adicionais do usuário com ID '${id_user}' não encontradas na tabela UsersDTO.`);
    }

    // Busca as informações na tabela UsersDTO2 usando o id_dto da tabela UsersDTO
    const userDTO2 = await this.prisma.usersDTO2.findFirst({
      where: { id_dto1: userDTO.id_dto },
    });

    if (!userDTO2) {
      throw new BadRequestException(`Informações adicionais do usuário com ID '${userDTO.id_dto}' não encontradas na tabela UsersDTO2.`);
    }

    // Retorna todas as informações combinadas
    return {
      user,
      userDTO,
      userDTO2,
    };
  }
}

