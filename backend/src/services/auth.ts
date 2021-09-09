import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, saltRounds);

export default {
  hashPassword,
};
