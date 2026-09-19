import { z } from 'zod';

export const phoneRx = /^(\+964|0)?7\d{9}$/;
export const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z.string().email('بريد إلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور 8 أحرف على الأقل'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'الاسم قصير جداً').max(80),
  email: z.string().email('بريد إلكتروني غير صالح'),
  password: z
    .string()
    .min(8, 'كلمة المرور 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
    .regex(/\d/, 'يجب أن تحتوي على رقم'),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'الاسم مطلوب').max(80),
  customerEmail: z.string().email('بريد إلكتروني غير صالح'),
  customerPhone: z.string().regex(phoneRx, 'رقم هاتف غير صالح'),
  shippingAddress: z.string().min(10, 'العنوان قصير جداً').max(300),
  city: z.string().min(2, 'المدينة مطلوبة'),
  postalCode: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
