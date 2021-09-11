import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = async (
  original: string,
  hashed: string
): Promise<boolean> => bcrypt.compare(original, hashed);

export default {
  hashPassword,
  comparePassword,
};
