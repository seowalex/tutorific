import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

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
      </IonToolbar>
    </IonHeader>
    <IonContent class={styles.chatContainer} fullscreen>
      <OfflineCard />

      <div className={styles.chat}>
        <div className={`${styles.chatBubble} ${styles.sent}`}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.sent}`}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.sent}`}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.received}`}>
          2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.received}`}>
          2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.sent}`}>
          3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.received}`}>
          4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.sent}`}>
          5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.received}`}>
          6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>

        <div className={`${styles.chatBubble} ${styles.sent}`}>
          7. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse fermentum finibus egestas.
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default Chat;
