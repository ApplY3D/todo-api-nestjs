import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ModifyTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  checked?: boolean;
}
