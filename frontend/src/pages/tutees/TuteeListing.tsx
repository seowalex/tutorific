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
  useIonViewWillEnter,
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
  useDeleteTuteeListingMutation,
  useGetTuteeListingQuery,
} from '../../api/tutee';
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
import { EventCategory, TuteeEventAction } from '../../types/analytics';
import SelectTimeSlotsItem from '../../components/timeSlots/SelectTimeSlotsItem';
import ChatRouterLink from '../../components/ChatRouterLink';

interface Params {
  id: string;
}

const TuteeListing: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const listingId = parseInt(id, 10);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing, refetch } = useGetTuteeListingQuery(listingId);
  const router = useIonRouter();

  const isOwnListing = userId === listing?.tutee.id;
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [showShareSheet, setShowShareSheet] = useState<boolean>(false);
  const [presentDeleteAlert] = useIonAlert();
  const [deleteTuteeListing] = useDeleteTuteeListingMutation();
  const [present] = useIonToast();

  const listingUrl = `${baseUrl}/tutees/listing/${listingId}`;

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const handleDeleteListing = async () => {
    try {
      await deleteTuteeListing(listingId).unwrap();

      ReactGA.event({
        category: EventCategory.Tutee,
        action: TuteeEventAction.Delete,
      });
      router.push('/tutees', 'back');
      setShowPopover({ showPopover: false, event: undefined });
    } catch {
      if (!window.navigator.onLine) {
        present({
          header: 'No Internet Connection',
          message: 'Listing will be deleted when you are online',
          duration: 5000,
        });
        router.push('/tutees', 'back');
        setShowPopover({ showPopover: false, event: undefined });
      }
    }
  };

  useIonViewWillEnter(() => {
    refetch();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutees" />
          </IonButtons>
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
              listing && (
                <ChatRouterLink profileId={listing.tutee.id}>
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
          <ProfileItem profile={listing.tutee} enableLink />
          <ListingDetail
            header="Subjects"
            label={formatStringList(listing.subjects)}
          />
          <ListingDetail header="Levels" label={listing.level} />
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
            routerLink={`/tutees/listing/${listingId}/edit`}
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
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
              window.location.href = `http://www.facebook.com/share.php?u=${listingUrl}`;
            },
          },
          {
            text: 'WhatsApp',
            icon: logoWhatsapp,
            handler: () => {
              window.open(`whatsapp://send?text=${listingUrl}`);
            },
          },
          {
            text: 'Telegram',
            icon: paperPlaneOutline,
            handler: () => {
              window.location.href = `https://t.me/share/url?url=${listingUrl}&text=I'm looking for students!`;
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

export default TuteeListing;
