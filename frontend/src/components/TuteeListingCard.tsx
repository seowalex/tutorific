import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';

import styles from './ListingCard.module.scss';
import ProfileItem from './ProfileItem';
import WeekDaysItem from './WeekDaysItem';
import { Level, Subject, TuteeListing } from '../types/listing';
import { Gender } from '../types/profile';
import { formatPriceRange, formatStringList } from '../app/utils';

interface Props {
  listing: TuteeListing;
  hideProfile?: boolean;
}

const TuteeListingCard: React.FC<Props> = (props: Props) => {
  const { listing, hideProfile } = props;

  const formatLevelAndGender = (level: Level, gender: Gender) =>
    `${level}${gender === Gender.PNTS ? '' : `\n${gender} Student`}`;

  return (
    <IonCard button routerLink={`/tutees/listing/${listing.id}`}>
      {!hideProfile && <ProfileItem profile={listing.tutee} />}
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
                {formatLevelAndGender(listing.level, listing.gender)}
              </IonCardSubtitle>
            </IonCol>
            <IonCol>
              <IonCardSubtitle class="ion-text-end">per hour</IonCardSubtitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonItem color="none" lines="none">
        <IonIcon icon={locationOutline} slot="start" />
        <IonLabel className={styles.itemLabel}>{listing.location}</IonLabel>
      </IonItem>
      <WeekDaysItem timeSlots={listing.timeSlots} />
    </IonCard>
  );
};

TuteeListingCard.defaultProps = {
  hideProfile: false,
};

export default TuteeListingCard;
