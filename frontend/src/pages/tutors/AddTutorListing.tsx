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
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useCreateTutorListingMutation } from '../../api/tutor';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TutorListingForm, {
  TutorListingFormData,
} from '../../components/TutorListingForm';
import { Level } from '../../app/types';
import { resetTutorListingPagination } from '../../reducers/tutorFilters';

const AddTutorListing: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector(selectCurrentUserId);
  const [createTutorListing] = useCreateTutorListingMutation();
  const history = useHistory();

  const onSubmit: SubmitHandler<TutorListingFormData> = async (data) => {
    if (userId == null) {
      console.log('User is not logged in');
      return;
    }

    try {
      const { price, ...details } = data;
      const listingData = {
        tutorId: userId,
        priceMin: price.lower,
        priceMax: price.upper,
        description: details.description,
        subjects: details.subjects as string[],
        levels: details.levels as Level[],
        timeSlots: details.timeSlots as number[],
      };
      const result = await createTutorListing(listingData);

      if ('data' in result && result.data) {
        dispatch(resetTutorListingPagination());
        history.push('/tutors');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Tutor Listing</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutors" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <TutorListingForm
                onSubmit={onSubmit}
                submitButtonText="Create Listing"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddTutorListing;
