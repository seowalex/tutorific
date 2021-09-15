import React from 'react';
import { RefresherEventDetail } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { addOutline, search } from 'ionicons/icons';

import TuteeListingCard from '../../components/TuteeListingCard';
import { useGetTuteeListingsQuery } from '../../api/tutee';

const Tutees: React.FC = () => {
  const { data: listings, refetch } = useGetTuteeListingsQuery();

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    refetch();

    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  useIonViewWillEnter(() => {
    refetch();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutee Listings</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton routerLink="/addtutee">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {listings?.map((listing) => (
          <TuteeListingCard listing={listing} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tutees;
