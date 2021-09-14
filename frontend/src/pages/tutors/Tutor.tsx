import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowBackOutline, chatbubbleOutline } from 'ionicons/icons';
import { RouteComponentProps, useHistory } from 'react-router';
import { useGetTutorListingQuery } from '../../api/tutor';
import { useAppSelector } from '../../app/hooks';
import ProfileItem from '../../components/ProfileItem';
import { selectCurrentUserId } from '../../reducers/auth';
import { formatPriceRange, formatStringList } from '../../app/utils';
import WeekDaysItem from '../../components/WeekDaysItem';
import ListingDetail from '../../components/ListingDetail';

const Tutor: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { id } = match.params;
  // eslint-disable-next-line radix
  const listingId = parseInt(id);
  const userId = useAppSelector(selectCurrentUserId);
  const { data: listing } = useGetTutorListingQuery(listingId);

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary" collapse>
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{JSON.stringify(listingId)}</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton>
              <IonIcon slot="icon-only" icon={chatbubbleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {listing ? (
        <IonContent fullscreen>
          <ProfileItem profile={listing.tutor} />
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
          <ListingDetail header="Available Times">
            <WeekDaysItem timeSlots={listing.timeSlots} detailed />
          </ListingDetail>
          <ListingDetail header="Description">
            <IonItem>
              <IonText>{listing.description}</IonText>
            </IonItem>
          </ListingDetail>
        </IonContent>
      ) : null}
    </IonPage>
  );
};

export default Tutor;
