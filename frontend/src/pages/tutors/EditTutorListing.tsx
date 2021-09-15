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
  useGetTutorListingQuery,
  useUpdateTutorListingMutation,
} from '../../api/tutor';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TutorListingForm, {
  TutorListingFormData,
} from '../../components/TutorListingForm';

const EditTutorListing: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const { id } = match.params;
  // eslint-disable-next-line radix
  const listingId = parseInt(id);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing } = useGetTutorListingQuery(listingId);
  const [updateTutorListing] = useUpdateTutorListingMutation();
  const history = useHistory();

  const onSubmit: SubmitHandler<TutorListingFormData> = async (data) => {
    if (userId == null) {
      console.log('User is not logged in');
      return;
    }

    try {
      const { price, ...details } = data;
      const listingData = {
        id: listingId,
        tutorId: userId,
        priceMin: price.lower,
        priceMax: price.upper,
        description: details.description,
        subjects: details.subjects as string[],
        levels: details.levels as string[],
        timeSlots: details.timeSlots as number[],
      };
      const result = await updateTutorListing(listingData);

      if ('data' in result && result.data) {
        history.push(`/tutor/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Tutor Listing</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tutor/${id}`} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <TutorListingForm
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

export default EditTutorListing;
