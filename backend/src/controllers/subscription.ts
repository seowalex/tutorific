import Koa from 'koa';
import subscriptionService from '../services/subscription';

const addSubscription = async (ctx: Koa.Context): Promise<void> => {
  const subscriptionJson = ctx.request.body;
  const { profileId } = ctx.state.user;

  const existingSubscription =
    await subscriptionService.getExisitingSubscription(
      profileId,
      JSON.stringify(subscriptionJson)
    );

  if (existingSubscription !== undefined) {
    existingSubscription.profile = profileId;
    ctx.body = {
      data: existingSubscription,
    };
    return;
  }

  const newSubscription = await subscriptionService.createSubscription({
    profile: profileId,
    subscriptionJson: JSON.stringify(subscriptionJson),
  });

  ctx.body = {
    data: newSubscription,
  };
};

export default {
  addSubscription,
};
