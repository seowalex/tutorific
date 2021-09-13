import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { search } from 'ionicons/icons';

import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TutorListingCard from '../../components/TutorListingCard';
import { useGetTutorListingsQuery } from '../../api/tutor';

const Tutors: React.FC = () => {
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listings } = useGetTutorListingsQuery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{JSON.stringify(userId)}</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInfiniteScroll>
          <IonInfiniteScrollContent>
            {listings?.map((listing) => (
              <TutorListingCard listing={listing} />
            ))}
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tutors;
