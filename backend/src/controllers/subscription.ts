import Koa from 'koa';
import HttpStatus from 'http-status-codes';
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

const deleteSubscription = async (ctx: Koa.Context): Promise<void> => {
  const subscriptionJson = ctx.request.body;
  await subscriptionService.deleteSubscription(
    JSON.stringify(subscriptionJson)
  );
  ctx.status = HttpStatus.OK;
  ctx.body = {};
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
