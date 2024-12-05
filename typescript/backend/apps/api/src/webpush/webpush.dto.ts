import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { SendWebPushDtoSchema } from './webpush.schema';

export type SendWebPushDtoSchema = z.infer<typeof SendWebPushDtoSchema>;
export class SendWebPushDto extends createZodDto(SendWebPushDtoSchema) {}
