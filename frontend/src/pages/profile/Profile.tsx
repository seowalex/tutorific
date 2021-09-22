import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
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
import Avatar from 'react-avatar';
import {
  arrowBackOutline,
  chatbubbleOutline,
  createOutline,
  female,
  logOutOutline,
  male,
} from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import api from '../../api/base';
import { useLogoutMutation } from '../../api/auth';
import { useGetProfileQuery } from '../../api/profile';
import { selectCurrentUser, unsetCredentials } from '../../reducers/auth';
import { Gender } from '../../types/profile';
import type { ErrorResponse } from '../../types/error';

import OfflineCard from '../../components/OfflineCard';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
import ChatRouterLink from '../../components/ChatRouterLink';

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

import styles from './Profile.module.scss';

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
  const { data: profile, refetch } = useGetProfileQuery(profileId);
  const isOwnProfile = user.profileId === profileId;

  const [listingType, setListingType] = useState<ListingType>(
    ListingType.Tutor
  );
  const tutorFilters = useAppSelector(selectProfileTutorPagination);
  const tuteeFilters = useAppSelector(selectProfileTuteePagination);

  const router = useIonRouter();
  const [present] = useIonToast();

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const handleLogout = async () => {
    if (window.navigator.onLine) {
      try {
        if (user.id && user.refreshToken) {
          await logout({
            id: user.id,
            refreshToken: user.refreshToken,
          }).unwrap();

          ReactGA.event({
            category: EventCategory.User,
            action: UserEventAction.Logout,
          });
        }

        dispatch(api.util.resetApiState());
        dispatch(unsetCredentials());
        dispatch(unsetTutorListingFilters());
        dispatch(unsetTuteeListingFilters());
        router.push('/tutors', 'back');
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
    } else {
      present({
        message: 'No internet connection',
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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
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
              <>
                <IonButton onClick={() => router.goBack()}>
                  <IonIcon slot="icon-only" icon={arrowBackOutline} />
                </IonButton>
                <ChatRouterLink profileId={profileId}>
                  <IonButton routerLink={`/chats/${id}`}>
                    <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                  </IonButton>
                </ChatRouterLink>
              </>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
            <IonButtons slot="primary">
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
                <>
                  <IonButton onClick={() => router.goBack()}>
                    <IonIcon slot="icon-only" icon={arrowBackOutline} />
                  </IonButton>
                  <ChatRouterLink profileId={profileId}>
                    <IonButton routerLink={`/chats/${id}`}>
                      <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                    </IonButton>
                  </ChatRouterLink>
                </>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <OfflineCard />

        <div>
          <div className={styles.header}>
            <Avatar
              className={styles.avatar}
              name={profile?.name}
              maxInitials={2}
              size="4rem"
              round
            />
            <div className={styles.name}>
              <h1 className="ion-no-margin">{profile?.name}</h1>
              {profile?.gender !== Gender.PNTS && (
                <IonText color="dark">
                  {profile?.gender} <GenderIcon />
                </IonText>
              )}
            </div>
            <p className={styles.description}>{profile?.description}</p>
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
