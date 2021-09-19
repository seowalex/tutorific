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
import FilterTuteeListingForm, {
  FilterTuteeListingFormData,
} from '../../components/FilterTuteeListingForm';
import {
  selectTuteeFilters,
  setTuteeListingFilters,
} from '../../reducers/tuteeFilters';

const FilterTuteeListings: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentFilters = useAppSelector(selectTuteeFilters);

  const onSubmit: SubmitHandler<FilterTuteeListingFormData> = (data) => {
    const filters = {
      ...data,
      skip: 0,
      limit: 10,
    };
    dispatch(setTuteeListingFilters(filters));
    history.push('/tutees');
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
