import { Utils } from "@/factory/Utils";
import { z } from "zod";

const login = z.object({
    email: z.string().email(),
    password: z.string({ required_error: 'Password is required' }).min(6),
});

export const loginSchema = Utils.schemaHelper({ body: login }, ['Auth']);
export type LoginInput = z.infer<typeof login>;


const refreshTokenInput = z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }).min(1),
    userId: z.string({ required_error: 'User ID is required' }).min(1)
})
export const refreshTokenSchema = Utils.schemaHelper({ body: refreshTokenInput }, ['Auth']);
export type RefreshTokenInput = z.infer<typeof refreshTokenInput>


const logoutInput = z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }).min(1),
    userId: z.string({ required_error: 'User ID is required' }).min(1),
    allDevices: z.boolean().optional()
})
export const logoutInputSchema = Utils.schemaHelper({ body: logoutInput }, ['Auth']);
export type LogoutInput = z.infer<typeof logoutInput>
