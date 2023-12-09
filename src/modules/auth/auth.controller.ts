import { LoginInput, LogoutInput, RefreshTokenInput } from "./auth.schema";
import { queryUserByEmail } from "../user/user.service";
import { HttpInternalServerError, HttpUnauthorizedError } from "@/factory/ServerError";
import { deleteXTokenByUserProfileId, deleteXTokenByXToken, findRefreshToken, insertRefreshToken, updateRefreshToken } from "./auth.service";
import { Controller } from "@/factory/Controller";
import { TokenManager } from "@/factory/TokenManager";
import ResponseData from "@/factory/ResponseData";

export const loginHandler = Controller<{ Body: LoginInput }>(async (req, reply) => {
    const { email, password }: LoginInput = req.body;
    const users = await queryUserByEmail(email);

    if (users.count === 0 || !users.at(0).password && !users.at(0).salt) {
        throw new HttpUnauthorizedError()
    }

    const user = users.shift();
    const verified = TokenManager.verifyPasswordToken(password, user.password, user.salt);

    if (!verified) {
        throw new HttpUnauthorizedError()
    }

    const accessToken = TokenManager.generateAccessToken(user.id);
    const refreshToken = await insertRefreshToken(user.id);
    const payload = {
        accessToken,
        refreshToken
    }

    return new ResponseData(reply, payload);
})

export const refreshTokenHandler = Controller<{ Body: RefreshTokenInput }>(async (req, reply) => {
    const { refreshToken, userId } = req.body;
    const xToken = await findRefreshToken(refreshToken);
    const verifyXToken = TokenManager.verifyRefreshToken(xToken.refreshToken, userId);

    if (!verifyXToken) {
        throw new HttpInternalServerError('Cannot verify refresh token')
    }

    // update refresh token
    await updateRefreshToken(xToken.id);
    return new ResponseData(reply, { accessToken: TokenManager.generateAccessToken(xToken.userProfileId) })
})

export const logoutHandler = Controller<{ Body: LogoutInput }>(async (req, reply) => {
    const { refreshToken, userId, allDevices } = req.body;

    await deleteXTokenByXToken(refreshToken)
    allDevices && await deleteXTokenByUserProfileId(userId)

    return new ResponseData(reply, "Logout Success!")

})

