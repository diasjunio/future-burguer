import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInfoUserPart1Dto } from './dto/create-info-user-part1.dto';
import { CreateInfoUserPart2Dto } from './dto/create-info-user-part2.dto';

@Injectable()
export class InfoUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createPart1(id_user: string, data: CreateInfoUserPart1Dto) {
    const existingUserDTO = await this.prisma.usersDTO.findFirst({
      where: { id_user },
    });

    if (existingUserDTO) {
      throw new BadRequestException(`Já existe um registro na tabela UsersDTO associado ao id_user '${id_user}'. Use o método update para editar os campos.`);
    }
    return this.prisma.usersDTO.create({
      data: {
        ...data,
        id_user, 
      },
    });
  }

  async createPart2(id_dto1: string, data: CreateInfoUserPart2Dto) {
    const existingUserDTO2 = await this.prisma.usersDTO2.findFirst({
      where: { id_dto1 },
    });

    if (existingUserDTO2) {
      throw new BadRequestException(`Já existe um registro na tabela UsersDTO2 associado ao id_dto1 '${id_dto1}'. Use o método update para editar os campos.`);
    }

    return this.prisma.usersDTO2.create({
      data: {
        ...data,
        id_dto1,
      },
    });
  }



  async updatePart1(id_dto: string, data: CreateInfoUserPart1Dto) {
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
  async getUserInfo(id_user: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      throw new BadRequestException(`Usuário com ID '${id_user}' não encontrado.`);
    }
    const userDTO = await this.prisma.usersDTO.findFirst({
      where: { id_user },
    });

    if (!userDTO) {
      throw new BadRequestException(`Informações adicionais do usuário com ID '${id_user}' não encontradas na tabela UsersDTO.`);
    }
    const userDTO2 = await this.prisma.usersDTO2.findFirst({
      where: { id_dto1: userDTO.id_dto },
    });

    if (!userDTO2) {
      throw new BadRequestException(`Informações adicionais do usuário com ID '${userDTO.id_dto}' não encontradas na tabela UsersDTO2.`);
    }
    return {
      user,
      userDTO,
      userDTO2,
    };
  }
}

