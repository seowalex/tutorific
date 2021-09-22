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
  selectTuteeFilters,
  TuteeFiltersState,
} from '../../reducers/tuteeFilters';
import { useAppSelector } from '../../app/hooks';
import TuteeListings from '../../components/TuteeListings';

const Tutees: React.FC = () => {
  const filters = useAppSelector(selectTuteeFilters);

  const areFiltersEmpty = (filtersState: TuteeFiltersState): boolean =>
    filtersState.priceMin == null &&
    filtersState.priceMax == null &&
    (filtersState.subjects == null || filtersState.subjects.length === 0) &&
    (filtersState.levels == null || filtersState.levels.length === 0) &&
    (filtersState.timeSlots == null || filtersState.timeSlots.length === 0) &&
    (filtersState.locations == null || filtersState.locations.length === 0) &&
    !filtersState.gender;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutee Listings</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton routerLink="/tutee/add">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonButton routerLink="/tutee/search">
              <IonIcon
                slot="icon-only"
                icon={areFiltersEmpty(filters) ? funnelOutline : funnel}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TuteeListings filters={filters} owner="all" />
      </IonContent>
    </IonPage>
  );
};

export default Tutees;
