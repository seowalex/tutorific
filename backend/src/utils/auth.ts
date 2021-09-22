import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SALT_ROUNDS = 10;
const JWT_EXPIRY = 300;
const CRYPTO_BYTES = 40;
const OPEN_ROUTES = {
  GET: ['/tutor', '/tutee', '/profile'],
  POST: ['/auth'],
  DELETE: ['/auth'],
};

const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = async (
  original: string,
  hashed: string
): Promise<boolean> => bcrypt.compare(original, hashed);

const generateJwtToken = async (
  userId: number,
  email: string,
  profileId: number | null
): Promise<string> =>
  jwt.sign({ userId, email, profileId }, process.env.JWT_SECRET ?? 'secret', {
    expiresIn: JWT_EXPIRY,
  });

const generateRefreshToken = (): string =>
  crypto.randomBytes(CRYPTO_BYTES).toString('hex');

const isOpenRoute = (method: string, url: string): boolean => {
  // Check frontend path
  if (!url.startsWith('/api/')) {
    return true;
  }

  if (!OPEN_ROUTES[method]) {
    return false;
  }

  const routes = OPEN_ROUTES[method];

  for (let i = 0; i < routes.length; i += 1) {
    const re = RegExp('^/api'.concat(routes[i]));
    if (url.match(re) != null) {
      return true;
    }
  }

  return false;
};

export default {
  hashPassword,
  comparePassword,
  generateJwtToken,
  generateRefreshToken,
  isOpenRoute,
};
