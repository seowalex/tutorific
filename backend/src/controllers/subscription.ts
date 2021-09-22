import Koa from 'koa';
import subscriptionService from '../services/subscription';

const addSubscription = async (ctx: Koa.Context): Promise<void> => {
  const subscriptionJson = ctx.request.body;
  const { profileId } = ctx.state.user;

  const newSubscription = await subscriptionService.createSubscription({
    profile: profileId,
    subscriptionJson: JSON.stringify(subscriptionJson),
  });

  ctx.body = {
    data: newSubscription,
  };
};

const deleteSubscription = async (ctx: Koa.Context): Promise<void> => {
  const subscriptionJson = ctx.request.body;
  await subscriptionService.deleteSubscription(
    JSON.stringify(subscriptionJson)
  );
};

const getSubscriptions = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;
  const subscriptions = await subscriptionService.getSubscriptions(profileId);

  ctx.body = {
    data: subscriptions.map((subscription) =>
      JSON.parse(subscription.subscriptionJson)
    ),
  };
};

export default {
  addSubscription,
  deleteSubscription,
  getSubscriptions,
};
