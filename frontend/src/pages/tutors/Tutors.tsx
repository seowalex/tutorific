import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { addOutline, funnel, funnelOutline } from 'ionicons/icons';
import {
  selectTutorFilters,
  TutorFiltersState,
} from '../../reducers/tutorFilters';
import { useAppSelector } from '../../app/hooks';
import TutorListings from '../../components/TutorListings';

const Tutors: React.FC = () => {
  const filters = useAppSelector(selectTutorFilters);

  const areFiltersEmpty = (filtersState: TutorFiltersState): boolean =>
    filtersState.priceMin == null &&
    filtersState.priceMax == null &&
    (filtersState.subjects == null || filtersState.subjects.length === 0) &&
    (filtersState.levels == null || filtersState.levels.length === 0) &&
    (filtersState.timeSlots == null || filtersState.timeSlots.length === 0) &&
    !filtersState.gender;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutor Listings</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton routerLink="/tutors/add">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonButton routerLink="/tutors/search">
              <IonIcon
                slot="icon-only"
                icon={areFiltersEmpty(filters) ? funnelOutline : funnel}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TutorListings filters={filters} owner="all" />
      </IonContent>
    </IonPage>
  );
};

export default Tutors;
