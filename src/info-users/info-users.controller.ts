import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { InfoUsersService } from './info-users.service';
import { CreateInfoUserPart1Dto } from './dto/create-info-user-part1.dto';
import { CreateInfoUserPart2Dto } from './dto/create-info-user-part2.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateInfoUserDto } from './dto/update-info-user-part2.dto';

@Controller('infoUsers')
export class InfoUsersController {
  constructor(private readonly infoUsersService: InfoUsersService) {}


  @Post(':id_user/part1')
  async createPart1(@Param('id_user') id_user: string, @Body() data: CreateInfoUserPart1Dto) {
    return this.infoUsersService.createPart1(id_user, data);
  }


  @Post(':id_user/part2')
  async createPart2(@Param('id_user') id_user: string, @Body() data: CreateInfoUserPart2Dto) {
    return this.infoUsersService.createPart2(id_user, data);
  }

  @Put(':id_dto')
  @IsPublic()
  async updatePart1(@Param('id_dto') id_dto: string, @Body() createInfoUserPart1Dto: CreateInfoUserPart1Dto) {
    return this.infoUsersService.updatePart1(id_dto, createInfoUserPart1Dto);
  }

  @Put(':id_dto2')
  @IsPublic()
  async updatePart2(@Param('id_dto2') id_dto2: string, @Body() createInfoUserPart2Dto: CreateInfoUserPart2Dto) {
    return this.infoUsersService.updatePart2(id_dto2, createInfoUserPart2Dto);
  }



  @Delete(':id_dto') // Endpoint DELETE para excluir o registro associado ao id_user
  @IsPublic()
  delete(@Param('id_dto') id_dto: string) {
    return this.infoUsersService.delete(id_dto);
  }
}

