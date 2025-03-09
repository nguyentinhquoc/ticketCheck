import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaSmallDto } from './create-area_small.dto';

export class UpdateAreaSmallDto extends PartialType(CreateAreaSmallDto) {}
