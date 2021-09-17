import Conversation from '../../models/conversation';
import Profile from '../../models/profile';

const ConversationSeed = (context?: {
  firstProfile: Profile;
  secondProfile: Profile;
}) => {
  const conversation = new Conversation();
  conversation.firstProfile = context?.firstProfile ?? new Profile();
  conversation.secondProfile = context?.secondProfile ?? new Profile();
  return conversation;
};

export default ConversationSeed;
