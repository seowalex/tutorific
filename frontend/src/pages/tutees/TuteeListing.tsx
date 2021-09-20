import React, { useState } from 'react';
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
import { useHistory, useRouteMatch } from 'react-router';
import {
  useDeleteTuteeListingMutation,
  useGetTuteeListingQuery,
} from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import ProfileItem from '../../components/ProfileItem';
import { selectCurrentUserId } from '../../reducers/auth';
import {
  computeWeekDays,
  formatPriceRange,
  formatStringList,
} from '../../app/utils';
import ListingDetail from '../../components/ListingDetail';

interface Params {
  id: string;
}

const TuteeListing: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const listingId = parseInt(id, 10);
  const userId = useAppSelector(selectCurrentUserId);
  const {
    data: listing,
    isLoading,
    refetch,
  } = useGetTuteeListingQuery(listingId);
  const history = useHistory();

  const isOwnListing = userId === listing?.tutee.id;
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [presentDeleteAlert] = useIonAlert();
  const [deleteTuteeListing] = useDeleteTuteeListingMutation();

  const handleDeleteListing = async () => {
    try {
      const result = await deleteTuteeListing(listingId);

      if ('data' in result && result.data) {
        history.push('/tutees');
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
            <IonButton routerLink="/tutees" disabled={isLoading}>
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
          <ProfileItem profile={listing.tutee} />
          <ListingDetail
            header="Subjects"
            label={formatStringList(listing.subjects)}
          />
          <ListingDetail header="Levels" label={listing.level} />
          <ListingDetail
            header="Hourly Rate"
            label={formatPriceRange(listing.priceMin, listing.priceMax)}
          />
          <ListingDetail
            header="Available Times"
            label={formatStringList(computeWeekDays(listing.timeSlots))}
          />
          <ListingDetail header="Gender" label={listing.gender} />
          <ListingDetail header="Location" label={listing.location} />
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
            routerLink={`/tutee/${listingId}/edit`}
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

export default TuteeListing;
