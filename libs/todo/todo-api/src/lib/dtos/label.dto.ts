import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour créer un label.
 */
export class CreateLabelDto {
  @ApiProperty({ description: 'Name of the label' })
  name: string;

  @ApiProperty({ description: 'Color of the label (hex format)' })
  color: string;
}

/**
 * DTO pour éditer un label.
 */
export class EditLabelDto {
  @ApiProperty({ description: 'Name of the label', required: false })
  name?: string;

  @ApiProperty({ description: 'Color of the label (hex format)', required: false })
  color?: string;
}

/**
 * DTO pour répondre avec un label.
 */
export class LabelResponseDto {
  @ApiProperty({ description: 'Unique identifier of the label' })
  id: string;

  @ApiProperty({ description: 'Name of the label' })
  name: string;

  @ApiProperty({ description: 'Color of the label (hex format)' })
  color: string;
}
