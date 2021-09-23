import { DeleteResult, getRepository } from 'typeorm';
import Subscription, { CreateSubscription } from '../models/subscription';

const createSubscription = async (
  subscription: CreateSubscription
): Promise<Subscription> => {
  const newSubscription = new Subscription();
  Object.assign(newSubscription, subscription);
  return getRepository(Subscription).save(newSubscription);
};

const deleteSubscription = async (
  targetSubscription: string
): Promise<DeleteResult> =>
  getRepository(Subscription).delete({
    subscriptionJson: targetSubscription,
  });

const getSubscriptions = async (profileId: number): Promise<Subscription[]> =>
  getRepository(Subscription).find({
    relations: ['profile'],
    where: {
      profile: profileId,
    },
  });

export default {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
};
