import React, { useState } from 'react';
import ReactGA from 'react-ga';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  arrowBackOutline,
  chatbubbleOutline,
  createOutline,
  ellipsisVertical,
  lockClosedOutline,
  shareSocialOutline,
  trashOutline,
} from 'ionicons/icons';
import { useRouteMatch } from 'react-router';
import {
  useDeleteTutorListingMutation,
  useGetTutorListingQuery,
} from '../../api/tutor';
import { useAppSelector } from '../../app/hooks';
import ProfileItem from '../../components/ProfileItem';
import { selectCurrentUserId } from '../../reducers/auth';
import {
  arrayToSelectedTimeSlots,
  formatPriceRange,
  formatStringList,
} from '../../app/utils';
import ListingDetail from '../../components/ListingDetail';
import { EventCategory, TutorEventAction } from '../../app/analytics';
import SelectTimeSlotsItem from '../../components/timeSlots/SelectTimeSlotsItem';

interface Params {
  id: string;
}

const TutorListing: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const listingId = parseInt(id, 10);
  const userId = useAppSelector(selectCurrentUserId);
  const {
    data: listing,
    isLoading,
    refetch,
  } = useGetTutorListingQuery(listingId);
  const router = useIonRouter();

  const isOwnListing = userId === listing?.tutor.id;
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [presentDeleteAlert] = useIonAlert();
  const [deleteTutorListing] = useDeleteTutorListingMutation();

  const handleDeleteListing = async () => {
    try {
      const result = await deleteTutorListing(listingId);

      if ('data' in result && result.data) {
        ReactGA.event({
          category: EventCategory.Tutor,
          action: TutorEventAction.Delete,
        });
        router.push('/tutors', 'back');
        setShowPopover({ showPopover: false, event: undefined });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useIonViewWillEnter(() => {
    refetch();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary" collapse>
            <IonButton disabled={isLoading} onClick={() => router.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{JSON.stringify(listingId)}</IonTitle>
          <IonButtons slot="primary" collapse>
            {isOwnListing ? (
              <IonButton
                onClick={(e: any) => {
                  e.persist();
                  setShowPopover({ showPopover: true, event: e });
                }}
              >
                <IonIcon slot="icon-only" icon={ellipsisVertical} />
              </IonButton>
            ) : (
              <IonButton>
                <IonIcon slot="icon-only" icon={chatbubbleOutline} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {listing ? (
        <IonContent fullscreen>
          <ProfileItem profile={listing.tutor} enableLink />
          <SelectTimeSlotsItem
            value={arrayToSelectedTimeSlots(listing.timeSlots)}
            disabled
            fill="solid"
            lines="none"
          />
          <ListingDetail
            header="Subjects"
            label={formatStringList(listing.subjects)}
          />
          <ListingDetail
            header="Levels"
            label={formatStringList(listing.levels)}
          />
          <ListingDetail
            header="Hourly Rate"
            label={formatPriceRange(listing.priceMin, listing.priceMax)}
          />
          <ListingDetail header="Description" label={listing.description} />
        </IonContent>
      ) : null}
      <IonPopover
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          <IonItem button detail={false}>
            <IonIcon icon={shareSocialOutline} slot="end" />
            <IonLabel>Share Listing</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            routerLink={`/tutors/listing/${listingId}/edit`}
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
            }}
          >
            <IonIcon icon={createOutline} slot="end" />
            <IonLabel>Edit Listing</IonLabel>
          </IonItem>
          <IonItem button detail={false}>
            <IonIcon icon={lockClosedOutline} slot="end" />
            <IonLabel>Close Listing</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            onClick={() =>
              presentDeleteAlert({
                header: 'Are you sure?',
                message: 'Deleting a listing is irreversible!',
                buttons: [
                  'Cancel',
                  { text: 'Ok', handler: () => handleDeleteListing() },
                ],
              })
            }
          >
            <IonIcon icon={trashOutline} slot="end" />
            <IonLabel>Delete Listing</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  );
};

export default TutorListing;
