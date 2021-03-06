import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { useRouteMatch } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { chatbubbleEllipses, person, send } from 'ionicons/icons';

import { useAppSelector } from '../../app/hooks';
import { useAddMessageMutation, useGetChatQuery } from '../../api/chat';
import { selectCurrentUserId } from '../../reducers/auth';
import { ChatEventAction, EventCategory } from '../../types/analytics';

import OfflineCard from '../../components/OfflineCard';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';

import styles from './Chat.module.scss';

interface Params {
  id: string;
}

interface MessageData {
  content: string;
}

const Chat: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();

  const [addMessage] = useAddMessageMutation();
  const { data: chat, refetch } = useGetChatQuery(parseInt(id, 10), {
    pollingInterval: Notification.permission === 'granted' ? 0 : 1000,
  });
  const currentUserId = useAppSelector(selectCurrentUserId);

  const [present] = useIonToast();
  const { handleSubmit, reset, control } = useForm<MessageData>();

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const onSubmit = async (data: MessageData) => {
    reset();

    try {
      if (currentUserId) {
        await addMessage({
          chatId: parseInt(id, 10),
          senderId: currentUserId,
          ...data,
        }).unwrap();
        ReactGA.event({
          category: EventCategory.Chat,
          action: ChatEventAction.Send,
        });
      }
    } catch (error) {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Message will be sent when you are online',
          duration: 5000,
        });
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLIonTextareaElement>
  ) => {
    if (!event.shiftKey && event.code === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{chat?.otherProfile.name}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/chats" />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton routerLink={`/profile/${chat?.otherProfile.id}`}>
              <IonIcon slot="icon-only" icon={person} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.chatContainer} fullscreen>
        <OfflineCard />

        {chat?.messages.length ? (
          <div className={styles.chat}>
            {chat?.messages.map((message) => (
              <div
                className={clsx(
                  styles.chatBubble,
                  currentUserId === message.senderId
                    ? styles.sent
                    : styles.received
                )}
                key={message.id}
              >
                {message.content}
              </div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder
            icon={chatbubbleEllipses}
            text="This chat has no messages. Send a message to start the conversation!"
          />
        )}
      </IonContent>
      <form className={styles.chatSend} onSubmit={handleSubmit(onSubmit)}>
        <IonItem
          className={styles.chatInputContainer}
          fill="outline"
          lines="full"
        >
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <IonTextarea
                className={styles.chatInput}
                placeholder="Message"
                onIonChange={onChange}
                onIonBlur={onBlur}
                value={value}
                rows={1}
                autoGrow
                onKeyDown={handleKeyDown}
                autocapitalize="on"
              />
            )}
            rules={{
              required: true,
            }}
          />
        </IonItem>
        <IonButton className={styles.chatButton} type="submit">
          <IonIcon slot="icon-only" icon={send} />
        </IonButton>
      </form>
    </IonPage>
  );
};

export default Chat;
