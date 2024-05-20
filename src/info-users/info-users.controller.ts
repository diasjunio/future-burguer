import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoUsersService } from './info-users.service';
import { CreateInfoUserDto } from './dto/create-info-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateInfoUserDto } from './dto/update-info-user.dto';

@Controller('infoUsers')
export class InfoUsersController {
  constructor(private readonly infoUsersService: InfoUsersService) {}

  @Post(':id_user') // Atualizado para incluir o parâmetro de rota ':id_user'
  @IsPublic()
  create(@Param('id_user') id_user: string, @Body() createInfoUserDto: CreateInfoUserDto) {
    return this.infoUsersService.create(id_user, createInfoUserDto); // Passa o id_user para o serviço
  }

  @Patch(':id_dto')
  @IsPublic()
  update(@Param('id_dto') id_dto: string, @Body() updateInfoUserDto: UpdateInfoUserDto) {
    return this.infoUsersService.update(id_dto, updateInfoUserDto);
  }

  @Delete(':id_dto') // Endpoint DELETE para excluir o registro associado ao id_user
  @IsPublic()
  delete(@Param('id_dto') id_dto: string) {
    return this.infoUsersService.delete(id_dto);
  }
}

