import { z } from 'zod';

export const SendWebPushDtoSchema = z.object({
  token: z.string(),
  title: z.string().optional(),
  body: z.string().optional(),
  icon: z.string().optional(),
});
