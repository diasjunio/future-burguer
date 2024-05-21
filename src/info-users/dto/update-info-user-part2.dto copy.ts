import { PartialType } from '@nestjs/mapped-types';

import { CreateInfoUserPart1Dto } from './create-info-user-part1.dto';

export class UpdateInfoUserDto extends PartialType(CreateInfoUserPart1Dto) {}
