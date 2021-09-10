import Koa from 'koa';
// import Profile from '../models/profile';
import profileServices from '../services/profile';

const updateProfile = async (ctx: Koa.Context): Promise<void> => {
  // const { profileId, name, description, gender } = ctx.request.body;

  const updatedProfile = { ...ctx.request.body, ...ctx.params };
  const savedProfile = await profileServices.saveProfile(updatedProfile);
  ctx.body = {
    data: {
      profileId: savedProfile.id,
    },
  };
};

export default {
  updateProfile,
};
