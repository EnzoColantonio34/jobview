import { PartialType } from '@nestjs/mapped-types';
import { CreateUsercontextDto } from './create-user-context.dto';

export class UpdateUserContextDto extends PartialType(CreateUsercontextDto) {}
