import React from 'react';
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
} from '@ionic/react';
import { SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterTutorListingForm, {
  FilterTutorListingFormData,
} from '../../components/FilterTutorListingForm';
import {
  selectTutorFilters,
  setTutorListingFilters,
} from '../../reducers/tutorFilters';

const FilterTutorListings: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentFilters = useAppSelector(selectTutorFilters);

  const onSubmit: SubmitHandler<FilterTutorListingFormData> = (data) => {
    const filters = {
      ...data,
      priceMin: Number.isNaN(data.priceMin) ? undefined : data.priceMin,
      priceMax: Number.isNaN(data.priceMax) ? undefined : data.priceMax,
      gender: data.gender ?? undefined,
    };
    dispatch(setTutorListingFilters(filters));
    history.push('/tutors');
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
