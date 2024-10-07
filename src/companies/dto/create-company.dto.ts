import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    required: true,
    description: 'Name of company',
    example: 'Company 1',
  })
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @ApiProperty({
    required: true,
    description: 'Address of company',
    example: '123/4/5 Nguyen Van Linh',
  })
  @IsNotEmpty({ message: 'Address không được để trống' })
  address: string;

  @ApiProperty({
    required: true,
    description: 'Description of company',
    example: 'Company 1 is a company',
  })
  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;
}
