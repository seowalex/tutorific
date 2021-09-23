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
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useCreateTuteeListingMutation } from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TuteeListingForm from '../../components/TuteeListingForm';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { unsetTuteeListingFilters } from '../../reducers/tuteeFilters';
import { TuteeListingFormData } from '../../types/listing';
import { EventCategory, TuteeEventAction } from '../../app/analytics';

const AddTuteeListing: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector(selectCurrentUserId);
  const [createTuteeListing] = useCreateTuteeListingMutation();
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
        tuteeId: userId,
        priceMin: price.lower,
        priceMax: price.upper,
        subjects: details.subjects as string[],
        timeSlots: selectedTimeSlotsToArray(details.timeSlots),
      };
      const result = await createTuteeListing(listingData);

      if ('data' in result && result.data) {
        ReactGA.event({
          category: EventCategory.Tutee,
          action: TuteeEventAction.Create,
        });
        dispatch(unsetTuteeListingFilters());
        history.push('/tutees');
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
