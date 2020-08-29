import { IsUUID } from 'class-validator';

export class RemoveParams {
  @IsUUID()
  id: string;
}
