import Koa from 'koa';
import profileService from '../services/profile';

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
  updateProfile,
};
