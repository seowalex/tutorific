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
import { RouteComponentProps, useHistory } from 'react-router';
import {
  useGetTuteeListingQuery,
  useUpdateTuteeListingMutation,
} from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TuteeListingForm, { TuteeListingFormData } from './TuteeListingForm';

const EditTuteeListing: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const { id } = match.params;
  // eslint-disable-next-line radix
  const listingId = parseInt(id);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing } = useGetTuteeListingQuery(listingId);
  const [updateTuteeListing] = useUpdateTuteeListingMutation();
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
        id: listingId,
        tuteeId: userId,
        priceMin: price.lower,
        priceMax: price.upper,
        subjects: details.subjects as string[],
        timeSlots: details.timeSlots as number[],
      };
      const result = await updateTuteeListing(listingData);

      if ('data' in result && result.data) {
        history.push(`/tutee/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Tutee Listing</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tutee/${id}`} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <TuteeListingForm
                onSubmit={onSubmit}
                submitButtonText="Edit Listing"
                currentData={listing}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditTuteeListing;
