import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import profileService from '../services/profile';
import userService from '../services/user';

const getProfile = async (ctx: Koa.Context): Promise<void> => {
  const profile = await profileService.getProfile(ctx.params.id);

  if (!profile) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: profile };
};

const updateProfile = async (ctx: Koa.Context): Promise<void> => {
  const savedProfile = await profileService.updateProfile(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = {
    data: savedProfile,
  };
};

const createProfile = async (ctx: Koa.Context): Promise<void> => {
  const { userId } = ctx.state.user;
  const user = await userService.getUser(userId);
  if (!user) {
    ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
  }
  const newProfile = await profileService.createProfile(ctx.request.body);
  user.profile = newProfile;
  await userService.updateUser(userId, user);
  ctx.body = {
    profileId: newProfile.id,
  };
};

export default {
  getProfile,
  updateProfile,
  createProfile,
};
