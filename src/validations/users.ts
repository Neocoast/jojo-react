import { z } from 'zod';

export const usersSearchSchema = z.object({
  search: z.string().optional().catch(undefined),
  page: z.coerce.number().int().min(1).catch(1),
});


