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
import React from 'react';
import ReactGA from 'react-ga';
import { SubmitHandler } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router';
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
  // eslint-disable-next-line radix
  const listingId = parseInt(id);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing } = useGetTuteeListingQuery(listingId);
  const [updateTuteeListing] = useUpdateTuteeListingMutation();
  const dispatch = useDispatch();
  const history = useHistory();
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
      const result = await updateTuteeListing(listingData).unwrap();

      ReactGA.event({
        category: EventCategory.Tutee,
        action: TuteeEventAction.Update,
      });
      dispatch(resetTuteeListingPagination());
      history.push(`/tutees/listing/${id}`);
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be updated when you are online',
          duration: 5000,
        });
        history.push(`/tutees/listing/${id}`);
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
