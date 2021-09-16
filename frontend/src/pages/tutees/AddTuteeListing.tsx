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
import { useCreateTuteeListingMutation } from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TuteeListingForm, {
  TuteeListingFormData,
} from '../../components/TuteeListingForm';

const AddTuteeListing: React.FC = () => {
  const userId = useAppSelector(selectCurrentUserId);
  const [createTuteeListing] = useCreateTuteeListingMutation();
  const history = useHistory();

  const onSubmit: SubmitHandler<TuteeListingFormData> = async (data) => {
    if (userId == null) {
      console.log('User is not logged in');
      return;
    }

    try {
      const { price, ...details } = data;
      const listingData = {
        ...details,
        tuteeId: userId,
        priceMin: price.lower,
        priceMax: price.upper,
        subjects: details.subjects as string[],
        timeSlots: details.timeSlots as number[],
      };
      const result = await createTuteeListing(listingData);

      if ('data' in result && result.data) {
        history.push('/tutees');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Tutee Listing</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutees" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <TuteeListingForm
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

export default AddTuteeListing;
