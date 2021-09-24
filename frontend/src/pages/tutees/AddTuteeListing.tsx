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
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useCreateTuteeListingMutation } from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TuteeListingForm from '../../components/TuteeListingForm';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { unsetTuteeListingFilters } from '../../reducers/tuteeFilters';
import { TuteeListingFormData } from '../../types/listing';
import { EventCategory, TuteeEventAction } from '../../types/analytics';

const AddTuteeListing: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector(selectCurrentUserId);
  const [createTuteeListing] = useCreateTuteeListingMutation();
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
        tuteeId: userId,
        priceMin: price.lower,
        priceMax: price.upper,
        subjects: details.subjects as string[],
        timeSlots: selectedTimeSlotsToArray(details.timeSlots),
      };
      await createTuteeListing(listingData).unwrap();

      ReactGA.event({
        category: EventCategory.Tutee,
        action: TuteeEventAction.Create,
      });
      dispatch(unsetTuteeListingFilters());
      history.push('/tutees');
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be added when you are online',
          duration: 5000,
        });
        history.push('/tutees');
      }
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
