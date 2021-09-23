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
import { EventCategory, TuteeEventAction } from '../../app/analytics';

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

  const onSubmit: SubmitHandler<TuteeListingFormData> = async (data) => {
    if (userId == null) {
      // eslint-disable-next-line no-console
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
        timeSlots: selectedTimeSlotsToArray(details.timeSlots),
      };
      const result = await updateTuteeListing(listingData);

      if ('data' in result && result.data) {
        ReactGA.event({
          category: EventCategory.Tutee,
          action: TuteeEventAction.Update,
        });
        dispatch(resetTuteeListingPagination());
        history.push(`/tutees/listing/${id}`);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
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
