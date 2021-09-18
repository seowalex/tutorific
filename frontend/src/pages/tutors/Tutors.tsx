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
import { addOutline, funnel, funnelOutline } from 'ionicons/icons';

import TutorListingCard from '../../components/TutorListingCard';
import { useGetTutorListingsQuery } from '../../api/tutor';
import { selectTutorFilters, TutorFiltersState } from '../../reducers/tutorFilters';
import { useAppSelector } from '../../app/hooks';

const Tutors: React.FC = () => {
  const filters = useAppSelector(selectTutorFilters);
  const { data: listings, refetch } = useGetTutorListingsQuery(filters);

  const areFiltersEmpty = (filtersState: TutorFiltersState): boolean =>
    filtersState.priceMin == null
      && filtersState.priceMax == null
      && (filtersState.subjects == null || filtersState.subjects.length === 0)
      && (filtersState.levels == null || filtersState.levels.length === 0)
      && (filtersState.timeSlots == null || filtersState.timeSlots.length === 0)
      && !filtersState.gender;
    

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
          <IonTitle>Tutor Listings</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton routerLink="/addtutor">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonButton routerLink="/searchtutor">
              <IonIcon slot="icon-only" icon={areFiltersEmpty(filters) ? funnelOutline : funnel} />
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
