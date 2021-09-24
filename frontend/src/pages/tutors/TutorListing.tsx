import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import {
  IonActionSheet,
  IonBackButton,
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
  IonToolbar,
  useIonAlert,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import {
  chatbubbleOutline,
  closeOutline,
  createOutline,
  ellipsisVertical,
  logoFacebook,
  logoWhatsapp,
  paperPlaneOutline,
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
  baseUrl,
  formatPriceRange,
  formatStringList,
} from '../../app/utils';
import ListingDetail from '../../components/ListingDetail';
import { EventCategory, TutorEventAction } from '../../types/analytics';
import SelectTimeSlotsItem from '../../components/timeSlots/SelectTimeSlotsItem';
import ChatRouterLink from '../../components/ChatRouterLink';

interface Params {
  id: string;
}

interface PopoverState {
  showPopover: boolean;
  event?: React.MouseEvent;
}

const TutorListing: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const listingId = parseInt(id, 10);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing, refetch } = useGetTutorListingQuery(listingId);
  const router = useIonRouter();

  const isOwnListing = userId === listing?.tutor.id;
  const [popoverState, setPopoverState] = useState<PopoverState>({
    showPopover: false,
  });
  const [showShareSheet, setShowShareSheet] = useState<boolean>(false);
  const [presentDeleteAlert] = useIonAlert();
  const [deleteTutorListing] = useDeleteTutorListingMutation();
  const [present] = useIonToast();

  const listingUrl = `${baseUrl}/tutors/listing/${listingId}`;

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const handleDeleteListing = async () => {
    try {
      await deleteTutorListing(listingId).unwrap();

      ReactGA.event({
        category: EventCategory.Tutor,
        action: TutorEventAction.Delete,
      });
      router.push('/tutors', 'back');
      setPopoverState({ showPopover: false });
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be deleted when you are online',
          duration: 5000,
        });
        router.push('/tutors', 'back');
        setPopoverState({ showPopover: false });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutors" />
          </IonButtons>
          <IonButtons slot="primary" collapse>
            {isOwnListing ? (
              <IonButton
                onClick={(e: React.MouseEvent<HTMLIonButtonElement>) => {
                  e.persist();
                  setPopoverState({ showPopover: true, event: e });
                }}
              >
                <IonIcon slot="icon-only" icon={ellipsisVertical} />
              </IonButton>
            ) : (
              listing && (
                <ChatRouterLink profileId={listing.tutor.id}>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                  </IonButton>
                </ChatRouterLink>
              )
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {listing ? (
        <IonContent fullscreen>
          <ProfileItem profile={listing.tutor} enableLink />
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
          <SelectTimeSlotsItem
            value={arrayToSelectedTimeSlots(listing.timeSlots)}
            disabled
            fill="solid"
            lines="none"
          />
          <ListingDetail header="Description" label={listing.description} />
        </IonContent>
      ) : null}
      <IonPopover
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setPopoverState({ showPopover: false })}
      >
        <IonList>
          <IonItem
            button
            detail={false}
            onClick={() => setShowShareSheet(true)}
          >
            <IonIcon icon={shareSocialOutline} slot="end" />
            <IonLabel>Share Listing</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            routerLink={`/tutors/listing/${listingId}/edit`}
            onClick={() => {
              setPopoverState({ showPopover: false });
            }}
          >
            <IonIcon icon={createOutline} slot="end" />
            <IonLabel>Edit Listing</IonLabel>
          </IonItem>
          {/* <IonItem button detail={false}>
            <IonIcon icon={lockClosedOutline} slot="end" />
            <IonLabel>Close Listing</IonLabel>
          </IonItem> */}
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
            <IonIcon color="danger" icon={trashOutline} slot="end" />
            <IonLabel color="danger">Delete Listing</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonActionSheet
        isOpen={showShareSheet}
        onDidDismiss={() => setShowShareSheet(false)}
        buttons={[
          {
            text: 'Facebook',
            icon: logoFacebook,
            handler: () => {
              if (window.navigator.onLine) {
                window.location.href = `http://www.facebook.com/share.php?u=${listingUrl}`;
              } else {
                present({
                  message: 'No internet connection',
                  color: 'danger',
                  duration: 2000,
                });
              }
            },
          },
          {
            text: 'WhatsApp',
            icon: logoWhatsapp,
            handler: () => {
              if (window.navigator.onLine) {
                window.open(`whatsapp://send?text=${listingUrl}`);
              } else {
                present({
                  message: 'No internet connection',
                  color: 'danger',
                  duration: 2000,
                });
              }
            },
          },
          {
            text: 'Telegram',
            icon: paperPlaneOutline,
            handler: () => {
              if (window.navigator.onLine) {
                window.location.href = `https://t.me/share/url?url=${listingUrl}&text=I'm looking for students!`;
              } else {
                present({
                  message: 'No internet connection',
                  color: 'danger',
                  duration: 2000,
                });
              }
            },
          },
          {
            text: 'Cancel',
            icon: closeOutline,
            handler: () => setShowShareSheet(false),
          },
        ]}
      />
    </IonPage>
  );
};

export default TutorListing;
