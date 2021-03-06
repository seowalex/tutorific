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
  useGetTutorListingQuery,
  useUpdateTutorListingMutation,
} from '../../api/tutor';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TutorListingForm from '../../components/TutorListingForm';
import { Level, TutorListingFormData } from '../../types/listing';
import { resetTutorListingPagination } from '../../reducers/tutorFilters';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { EventCategory, TutorEventAction } from '../../types/analytics';

interface Params {
  id: string;
}

const EditTutorListing: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const listingId = parseInt(id, 10);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing } = useGetTutorListingQuery(listingId);
  const [updateTutorListing] = useUpdateTutorListingMutation();
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [present] = useIonToast();

  const onSubmit: SubmitHandler<TutorListingFormData> = async (data) => {
    if (userId == null) {
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
        levels: details.levels as Level[],
        timeSlots: selectedTimeSlotsToArray(details.timeSlots),
      };
      await updateTutorListing(listingData).unwrap();

      ReactGA.event({
        category: EventCategory.Tutor,
        action: TutorEventAction.Update,
      });
      dispatch(resetTutorListingPagination());
      router.push(`/tutors/listing/${id}`, 'back');
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be updated when you are online',
          duration: 5000,
        });
        router.push(`/tutors/listing/${id}`, 'back');
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Tutor Listing</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tutors/listing/${id}`} />
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
