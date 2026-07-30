import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
    { expiresIm: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFREESH_TOKEN_EXPIRES_IN, }
    );
}