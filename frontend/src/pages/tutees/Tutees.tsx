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

import { useAppSelector } from '../../app/hooks';
import {
  selectTuteeFilters,
  TuteeFiltersState,
} from '../../reducers/tuteeFilters';

import TuteeListings from '../../components/TuteeListings';
import OfflineCard from '../../components/OfflineCard';

const Tutees: React.FC = () => {
  const filters = useAppSelector(selectTuteeFilters);

  const areFiltersEmpty = (filtersState: TuteeFiltersState) =>
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
            <IonButton routerLink="/tutees/add">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonButton routerLink="/tutees/search">
              <IonIcon
                slot="icon-only"
                icon={areFiltersEmpty(filters) ? funnelOutline : funnel}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tutee Listings</IonTitle>
            <IonButtons slot="primary">
              <IonButton routerLink="/tutees/add">
                <IonIcon slot="icon-only" icon={addOutline} />
              </IonButton>
              <IonButton routerLink="/tutees/search">
                <IonIcon
                  slot="icon-only"
                  icon={areFiltersEmpty(filters) ? funnelOutline : funnel}
                />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <OfflineCard />
        <TuteeListings filters={filters} owner="all" />
      </IonContent>
    </IonPage>
  );
};

export default Tutees;
