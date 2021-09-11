import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SALT_ROUNDS = 10;
const JWT_EXPIRY = 300;
const CRYPTO_BYTES = 40;

const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = async (
  original: string,
  hashed: string
): Promise<boolean> => bcrypt.compare(original, hashed);

const generateJwtToken = async (
  userId: number,
  email: string,
  profileId: number
): Promise<string> =>
  jwt.sign({ userId, email, profileId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

const generateRefreshToken = (): string =>
  crypto.randomBytes(CRYPTO_BYTES).toString('hex');

export default {
  hashPassword,
  comparePassword,
  generateJwtToken,
  generateRefreshToken,
};
