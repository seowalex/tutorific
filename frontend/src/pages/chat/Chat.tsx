import React, { useEffect } from 'react';
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
} from '@ionic/react';
import { useRouteMatch } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { person, send } from 'ionicons/icons';

import { useAppSelector } from '../../app/hooks';
import { useAddMessageMutation, useGetChatQuery } from '../../api/chat';
import { selectCurrentUserId } from '../../reducers/auth';

import OfflineCard from '../../components/OfflineCard';

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

  const { data: chat, refetch } = useGetChatQuery(parseInt(id, 10));
  const [addMessage] = useAddMessageMutation();
  const currentUserId = useAppSelector(selectCurrentUserId);

  const { handleSubmit, reset, control } = useForm<MessageData>();

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const onSubmit = async (data: MessageData) => {
    await addMessage({ chatId: parseInt(id, 10), ...data }).unwrap();
    reset();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/chats" />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton routerLink={`/profile/${id}`}>
              <IonIcon slot="icon-only" icon={person} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.chatContainer} fullscreen>
        <OfflineCard />

        <div className={styles.chat}>
          {chat?.map((message) => (
            <div
              className={clsx(
                'ion-text-prewrap',
                styles.chatBubble,
                currentUserId === message.senderId
                  ? styles.sent
                  : styles.received
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
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
