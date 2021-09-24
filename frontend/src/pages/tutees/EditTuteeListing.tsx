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
import React from 'react';
import ReactGA from 'react-ga';
import { SubmitHandler } from 'react-hook-form';
import { useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  useGetTuteeListingQuery,
  useUpdateTuteeListingMutation,
} from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TuteeListingForm from '../../components/TuteeListingForm';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { resetTuteeListingPagination } from '../../reducers/tuteeFilters';
import { TuteeListingFormData } from '../../types/listing';
import { EventCategory, TuteeEventAction } from '../../types/analytics';

interface Params {
  id: string;
}

const EditTuteeListing: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const listingId = parseInt(id, 10);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing } = useGetTuteeListingQuery(listingId);
  const [updateTuteeListing] = useUpdateTuteeListingMutation();
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [present] = useIonToast();

  const onSubmit: SubmitHandler<TuteeListingFormData> = async (data) => {
    if (userId == null) {
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
        timeSlots: selectedTimeSlotsToArray(details.timeSlots),
      };
      await updateTuteeListing(listingData).unwrap();

      ReactGA.event({
        category: EventCategory.Tutee,
        action: TuteeEventAction.Update,
      });
      dispatch(resetTuteeListingPagination());
      router.push(`/tutees/listing/${id}`, 'back');
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be updated when you are online',
          duration: 5000,
        });
        router.push(`/tutees/listing/${id}`, 'back');
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Tutee Listing</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tutees/listing/${id}`} />
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
