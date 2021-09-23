import React from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterTuteeListingForm, {
  FilterTuteeListingFormData,
} from '../../components/FilterTuteeListingForm';
import {
  selectTuteeFilters,
  setTuteeListingFilters,
} from '../../reducers/tuteeFilters';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { EventCategory, TuteeEventAction } from '../../types/analytics';

const FilterTuteeListings: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentFilters = useAppSelector(selectTuteeFilters);
  const [present] = useIonToast();

  const onSubmit: SubmitHandler<FilterTuteeListingFormData> = (data) => {
    if (window.navigator.onLine) {
      const filters = {
        ...data,
        timeSlots: selectedTimeSlotsToArray(data.timeSlots),
        skip: 0,
        limit: 10,
      };
      dispatch(setTuteeListingFilters(filters));
      ReactGA.event({
        category: EventCategory.Tutee,
        action: TuteeEventAction.Filter,
      });
      history.push('/tutees');
    } else {
      present({
        message: 'No internet connection',
        color: 'danger',
        duration: 2000,
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Tutee Listings</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutees" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <FilterTuteeListingForm
                onSubmit={onSubmit}
                submitButtonText="Search Listings"
                currentData={currentFilters}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default FilterTuteeListings;
