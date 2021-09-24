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
import { useCreateTutorListingMutation } from '../../api/tutor';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUserId } from '../../reducers/auth';

import TutorListingForm from '../../components/TutorListingForm';
import { Level, TutorListingFormData } from '../../types/listing';
import { unsetTutorListingFilters } from '../../reducers/tutorFilters';
import { selectedTimeSlotsToArray } from '../../app/utils';
import { EventCategory, TutorEventAction } from '../../types/analytics';

const AddTutorListing: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector(selectCurrentUserId);
  const [createTutorListing] = useCreateTutorListingMutation();
  const history = useHistory();
  const [present] = useIonToast();

  const onSubmit: SubmitHandler<TutorListingFormData> = async (data) => {
    if (userId == null) {
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
        timeSlots: selectedTimeSlotsToArray(details.timeSlots),
      };
      await createTutorListing(listingData).unwrap();

      ReactGA.event({
        category: EventCategory.Tutor,
        action: TutorEventAction.Create,
      });
      dispatch(unsetTutorListingFilters());
      history.push('/tutors');
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be added when you are online',
          duration: 5000,
        });
        history.push('/tutors');
      }
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
