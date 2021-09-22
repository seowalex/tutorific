import React from 'react';
import { useIonRouter, useIonToast } from '@ionic/react';

import { useAddChatMutation, useGetChatsQuery } from '../api/chat';

interface Props {
  profileId: number;
}

const ChatRouterLink: React.FC<Props> = ({ children, profileId }) => {
  const [addChat] = useAddChatMutation();
  const { data: chats } = useGetChatsQuery();

  const router = useIonRouter();
  const [present] = useIonToast();

  const handleChat = async () => {
    let chatId = chats?.find((chat) => chat.otherProfile.id === profileId)?.id;

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
