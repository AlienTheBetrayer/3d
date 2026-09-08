import { verification_code_type as verificationCodeTypeEnum } from '@repo/db/schema';
import * as z from 'zod';

export const verification_code_typeSchema = z.enum(verificationCodeTypeEnum.enumValues);

export type verification_code_type = z.infer<typeof verification_code_typeSchema>;
