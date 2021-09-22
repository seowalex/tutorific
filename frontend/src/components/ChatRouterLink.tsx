import React from 'react';
import { useIonRouter, useIonToast } from '@ionic/react';

import { useAppSelector } from '../app/hooks';
import { selectCurrentUserId } from '../reducers/auth';
import { useAddChatMutation, useGetChatsQuery } from '../api/chat';

interface Props {
  profileId: number;
}

const ChatRouterLink: React.FC<Props> = ({ children, profileId }) => {
  const [addChat] = useAddChatMutation();
  const { data: chats } = useGetChatsQuery();
  const currentUserId = useAppSelector(selectCurrentUserId);

  const router = useIonRouter();
  const [present] = useIonToast();

  const handleChat = async () => {
    if (currentUserId) {
      let chatId = chats?.find(
        (chat) => chat.otherProfile.id === profileId
      )?.id;

      if (chatId) {
        router.push(`/chats/${chatId}`);
      } else if (window.navigator.onLine) {
        chatId = await addChat(profileId).unwrap();
        router.push(`/chats/${chatId}`);
      } else {
        present({
          message: 'No internet connection',
          color: 'danger',
          duration: 2000,
        });
      }
    } else {
      router.push('/login');
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: handleChat });
    }

    return child;
  });

  return <>{childrenWithProps}</>;
};

export default ChatRouterLink;
