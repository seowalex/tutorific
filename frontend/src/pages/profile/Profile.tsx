import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import {
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
  ellipsisVertical,
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
  const [popoverState, setPopoverState] = useState({
    showPopover: false,
    event: undefined,
  });

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const handleLogout = async () => {
    if (window.navigator.onLine) {
      try {
        let subscription = null;

        if (window.navigator.serviceWorker.controller?.state === 'activated') {
          const registration = await window.navigator.serviceWorker.ready;
          subscription = await registration?.pushManager.getSubscription();
        }

        if (user.id && user.refreshToken) {
          await logout({
            id: user.id,
            refreshToken: user.refreshToken,
            subscriptionJson: subscription,
          }).unwrap();

          ReactGA.event({
            category: EventCategory.User,
            action: UserEventAction.Logout,
          });
        }

        subscription?.unsubscribe();
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
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="primary" collapse>
            {isOwnProfile ? (
              <IonButton
                onClick={(e: any) => {
                  e.persist();
                  setPopoverState({ showPopover: true, event: e });
                }}
              >
                <IonIcon slot="icon-only" icon={ellipsisVertical} />
              </IonButton>
            ) : (
              <ChatRouterLink profileId={profileId}>
                <IonButton>
                  <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                </IonButton>
              </ChatRouterLink>
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
                <IonButton
                  onClick={(e: any) => {
                    e.persist();
                    setPopoverState({ showPopover: true, event: e });
                  }}
                >
                  <IonIcon slot="icon-only" icon={ellipsisVertical} />
                </IonButton>
              ) : (
                <ChatRouterLink profileId={profileId}>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                  </IonButton>
                </ChatRouterLink>
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
      <IonPopover
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setPopoverState({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          <IonItem
            button
            detail={false}
            routerLink={`/profile/${id}/edit`}
            onClick={() => {
              setPopoverState({ showPopover: false, event: undefined });
            }}
          >
            <IonIcon icon={createOutline} slot="end" />
            <IonLabel>Edit Profile</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            onClick={handleLogout}
          >
            <IonIcon icon={logOutOutline} slot="end" color='danger'/>
            <IonLabel color='danger'>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  );
};

export default Profile;
