import React from 'react';
import {
  IonCard,
  IonCardContent,
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
import { TutorListing } from '../app/types';
import { formatPriceRange, formatStringList } from '../app/utils';

interface Props {
  listing: TutorListing;
}

const TutorListingCard: React.FC<Props> = (props: Props) => {
  const { listing } = props;

  return (
    <IonCard button routerLink={`/tutors/listing/${listing.id}`}>
      <IonCardHeader>
        <ProfileItem profile={listing.tutor} />
        <IonGrid className={styles.listingCardHeaderContainer}>
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
      <IonCardContent className={styles.listingCardDescription}>
        {listing.description}
      </IonCardContent>
    </IonCard>
  );
};

export default TutorListingCard;
