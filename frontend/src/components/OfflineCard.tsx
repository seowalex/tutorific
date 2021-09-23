import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';
import { cloudOfflineOutline } from 'ionicons/icons';

import styles from './OfflineCard.module.scss';

const OfflineCard: React.FC = () => {
  const [online, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return online ? null : (
    <IonCard className={styles.card}>
      <IonIcon
        className="ion-margin-start"
        icon={cloudOfflineOutline}
        size="large"
      />
      <IonCardHeader>
        <IonCardTitle>Offline</IonCardTitle>
        <IonCardSubtitle>
          You are currently offline. Certain functions may not be available, and
          data may be out of date.
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default OfflineCard;
