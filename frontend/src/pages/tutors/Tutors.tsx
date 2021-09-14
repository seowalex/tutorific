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
} from '@ionic/react';
import { addOutline, search } from 'ionicons/icons';

import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TutorListingCard from '../../components/TutorListingCard';
import { useGetTutorListingsQuery } from '../../api/tutor';

const Tutors: React.FC = () => {
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listings, refetch } = useGetTutorListingsQuery();

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    refetch();

    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{JSON.stringify(userId)}</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton routerLink="/addtutor">
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
          <TutorListingCard listing={listing} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tutors;
