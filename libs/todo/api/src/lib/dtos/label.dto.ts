/**
 * DTO pour créer un label.
 */
export interface CreateLabelDto {
  name: string;
  color: string;
}

/**
 * DTO pour éditer un label.
 */
export interface EditLabelDto {
  name?: string;
  color?: string;
}

/**
 * DTO pour répondre avec un label.
 */
export interface LabelResponseDto {
  id: string;
  name: string;
  color: string;
}
