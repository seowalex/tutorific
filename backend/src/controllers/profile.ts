import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import profileService from '../services/profile';
import userService from '../services/user';
import authService from '../utils/auth';

const getProfile = async (ctx: Koa.Context): Promise<void> => {
  const profile = await profileService.getProfile(ctx.params.id);

  if (!profile) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: profile };
};

const updateProfile = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;
  if (profileId !== Number(ctx.params.id)) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const savedProfile = await profileService.updateProfile(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = {
    data: savedProfile,
  };
};

const createProfile = async (ctx: Koa.Context): Promise<void> => {
  const { userId, email } = ctx.state.user;
  // disallow creating profile more than once
  const user = await userService.getUser(userId);
  if (user?.profile !== null) {
    ctx.throw(HttpStatus.CONFLICT);
  }
  const newProfile = await profileService.createProfile(ctx.request.body);
  await userService.updateUser(userId, {
    profile: newProfile,
  });

  // create new jwt and pass to FE
  const newJwt = await authService.generateJwtToken(
    userId,
    email,
    newProfile.id
  );
  ctx.body = {
    profileId: newProfile.id,
    jwtToken: newJwt,
  };
};

export default {
  getProfile,
  updateProfile,
  createProfile,
};
