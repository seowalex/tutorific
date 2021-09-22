import React, { useState } from 'react';
import ReactGA from 'react-ga';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { useRouteMatch } from 'react-router-dom';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  arrowBackOutline,
  chatbubbleOutline,
  createOutline,
  female,
  logOutOutline,
  male,
} from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLogoutMutation } from '../../api/auth';
import { Gender, useGetProfileQuery } from '../../api/profile';
import { selectCurrentUser, unsetCredentials } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';

import styles from './Profile.module.scss';
import { unsetTutorListingFilters } from '../../reducers/tutorFilters';
import { unsetTuteeListingFilters } from '../../reducers/tuteeFilters';
import { EventCategory, UserEventAction } from '../../app/analytics';
import {
  selectProfileTuteePagination,
  selectProfileTutorPagination,
} from '../../reducers/profileListings';
import { ListingType } from '../../app/types';
import TutorListings from '../../components/TutorListings';
import TuteeListings from '../../components/TuteeListings';

interface Params {
  id: string;
}

const Profile: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const profileId = parseInt(id, 10);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const user = useAppSelector(selectCurrentUser);
  const { data: profile } = useGetProfileQuery(profileId);
  const isOwnProfile = user.profileId === profileId;

  const [listingType, setListingType] = useState<ListingType>(
    ListingType.Tutor
  );
  const tutorFilters = useAppSelector(selectProfileTutorPagination);
  const tuteeFilters = useAppSelector(selectProfileTuteePagination);

  const router = useIonRouter();
  const [present] = useIonToast();

  const handleLogout = async () => {
    try {
      if (user.id && user.refreshToken) {
        await logout({ id: user.id, refreshToken: user.refreshToken }).unwrap();
      }

      ReactGA.event({
        category: EventCategory.User,
        action: UserEventAction.Logout,
      });
      dispatch(unsetCredentials());
      dispatch(unsetTutorListingFilters());
      dispatch(unsetTuteeListingFilters());
      router.push('/', 'back');
    } catch (error) {
      const message = (
        (error as FetchBaseQueryError).data as ErrorResponse
      ).errors
        .flatMap((errorMessage) => errorMessage.detail)
        .join(', ');

      present({
        message,
        color: 'danger',
        duration: 2000,
      });
    }
  };

  const GenderIcon = () => {
    switch (profile?.gender) {
      case Gender.Female:
        return <IonIcon icon={female} />;
      case Gender.Male:
        return <IonIcon icon={male} />;
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {!isOwnProfile && (
            <IonButtons slot="secondary" collapse>
              <IonButton onClick={() => router.goBack()}>
                <IonIcon slot="icon-only" icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="primary" collapse>
            {isOwnProfile ? (
              <>
                <IonButton routerLink={`/profile/${id}/edit`}>
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonButton>
                <IonButton onClick={handleLogout}>
                  <IonIcon slot="icon-only" icon={logOutOutline} />
                </IonButton>
              </>
            ) : (
              <IonButton routerLink={`/chat/${id}`} routerDirection="none">
                <IonIcon slot="icon-only" icon={chatbubbleOutline} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
            <IonButtons slot="primary">
              {user.profileId === parseInt(id, 10) ? (
                <IonButton routerLink={`/profile/${id}/edit`}>
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonButton>
              ) : (
                <IonButton routerLink={`/chat/${id}`} routerDirection="none">
                  <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                </IonButton>
              )}
              <IonButton onClick={handleLogout}>
                <IonIcon slot="icon-only" icon={logOutOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div>
          <div className="ion-margin">
            <div className={styles.header}>
              <IonAvatar className={styles.avatar}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile?.name ?? ''
                  )}&background=random`}
                />
              </IonAvatar>
              <div>
                <h1 className="ion-no-margin">{profile?.name}</h1>
                {profile?.gender !== Gender.PNTS && (
                  <IonText color="dark">
                    {profile?.gender} <GenderIcon />
                  </IonText>
                )}
              </div>
            </div>

            <p>{profile?.description}</p>
          </div>
          <IonSegment
            value={listingType}
            onIonChange={(e) => setListingType(e.detail.value as ListingType)}
          >
            {Object.keys(ListingType).map((key) => (
              <IonSegmentButton value={key as ListingType}>
                <IonLabel>{key}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>

        {listingType === ListingType.Tutor && (
          <TutorListings
            filters={{ profileId, ...tutorFilters }}
            owner={isOwnProfile ? 'self' : 'other'}
            disableRefresh
            hideProfiles
          />
        )}

        {listingType === ListingType.Tutee && (
          <TuteeListings
            filters={{ profileId, ...tuteeFilters }}
            owner={isOwnProfile ? 'self' : 'other'}
            disableRefresh
            hideProfiles
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
