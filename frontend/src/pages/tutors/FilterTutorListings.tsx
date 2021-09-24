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
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterTutorListingForm, {
  FilterTutorListingFormData,
} from '../../components/FilterTutorListingForm';
import {
  selectTutorFilters,
  setTutorListingFilters,
} from '../../reducers/tutorFilters';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { EventCategory, TutorEventAction } from '../../types/analytics';

const FilterTutorListings: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const currentFilters = useAppSelector(selectTutorFilters);
  const [present] = useIonToast();

  const onSubmit: SubmitHandler<FilterTutorListingFormData> = (data) => {
    if (window.navigator.onLine) {
      const filters = {
        ...data,
        timeSlots: selectedTimeSlotsToArray(data.timeSlots),
        skip: 0,
        limit: 10,
      };
      dispatch(setTutorListingFilters(filters));
      ReactGA.event({
        category: EventCategory.Tutor,
        action: TutorEventAction.Filter,
      });
      router.push('/tutors', 'back');
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
          <IonTitle>Search Tutor Listings</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutors" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <FilterTutorListingForm
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

export default FilterTutorListings;
