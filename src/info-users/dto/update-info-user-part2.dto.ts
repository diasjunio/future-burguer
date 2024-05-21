import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoUserPart2Dto } from './create-info-user-part2.dto';

export class UpdateInfoUserDto extends PartialType(CreateInfoUserPart2Dto) {}