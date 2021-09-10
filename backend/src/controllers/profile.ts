import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import profileService from '../services/profile';

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

export default {
  getProfile,
  updateProfile,
};
