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
import clsx from 'clsx';
import { person, send } from 'ionicons/icons';

import { useAppSelector } from '../../app/hooks';
import { useGetChatQuery } from '../../api/chat';
import { selectCurrentUserId } from '../../reducers/auth';

import OfflineCard from '../../components/OfflineCard';

import styles from './Chat.module.scss';

interface Params {
  id: string;
}

const Chat: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();

  const { data: chat, refetch } = useGetChatQuery(parseInt(id, 10));
  const currentUserId = useAppSelector(selectCurrentUserId);

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

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
      <div className={styles.chatSend}>
        <IonItem
          className={styles.chatInputContainer}
          fill="outline"
          lines="full"
        >
          <IonTextarea
            className={styles.chatInput}
            placeholder="Message"
            rows={1}
            autoGrow
          />
        </IonItem>
        <IonButton className={styles.chatButton}>
          <IonIcon slot="icon-only" icon={send} />
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Chat;
