import React from 'react';
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
import clsx from 'clsx';
import { person, send } from 'ionicons/icons';

import OfflineCard from '../../components/OfflineCard';

import styles from './Chat.module.scss';

const Chat: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Chat</IonTitle>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/chats" />
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton routerLink={`/profile/${1}`}>
            <IonIcon slot="icon-only" icon={person} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className={styles.chatContainer} fullscreen>
      <OfflineCard />

      <div className={styles.chat}>
        <div className={clsx(styles.chatBubble, styles.sent)}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.sent)}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.sent)}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.received)}>
          2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.received)}>
          2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.sent)}>
          3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.received)}>
          4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.sent)}>
          5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.received)}>
          6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={clsx(styles.chatBubble, styles.sent)}>
          7. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>
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

export default Chat;
