import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';

import styles from './ListingCard.module.scss';
import ProfileItem from './ProfileItem';
import WeekDaysItem from './WeekDaysItem';
import { Subject, TutorListing } from '../types/listing';
import { formatPriceRange, formatStringList } from '../app/utils';

interface Props {
  listing: TutorListing;
  hideProfile?: boolean;
}

const TutorListingCard: React.FC<Props> = (props: Props) => {
  const { listing, hideProfile } = props;

  return (
    <IonCard button routerLink={`/tutors/listing/${listing.id}`}>
      {!hideProfile && <ProfileItem profile={listing.tutor} />}
      <IonCardHeader
        className={
          hideProfile
            ? styles.listingCardHeaderContainerWithoutProfile
            : styles.listingCardHeaderContainer
        }
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCardTitle
                class="ion-text-start"
                className={styles.listingCardTitle}
              >
                {formatStringList(listing.subjects)}
              </IonCardTitle>
            </IonCol>
            <IonCol>
              <IonCardTitle class="ion-text-end">
                {formatPriceRange(listing.priceMin, listing.priceMax)}
              </IonCardTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCardSubtitle class="ion-text-start">
                {formatStringList(listing.levels)}
              </IonCardSubtitle>
            </IonCol>
            <IonCol>
              <IonCardSubtitle class="ion-text-end">per hour</IonCardSubtitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <WeekDaysItem timeSlots={listing.timeSlots} />
    </IonCard>
  );
};

TutorListingCard.defaultProps = {
  hideProfile: false,
};

export default TutorListingCard;
