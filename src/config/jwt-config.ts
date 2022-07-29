import { Algorithm } from 'jsonwebtoken';

const algorithm: Algorithm = 'HS256';

export const JWT_CONFIG = {
    jwtKey: 'crypto_key',
    jwtExpirySeconds: 3600, //1 hour
    algorithm: algorithm,
};