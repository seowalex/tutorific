import React, { useEffect } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
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
  chatbubbleOutline,
  closeCircle,
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

import styles from './Profile.module.scss';

interface Params {
  id: string;
}

const Profile: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();

  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectCurrentUser);
  const { data: profile, refetch } = useGetProfileQuery(parseInt(id, 10));
  const hasListings = false;

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
        }

        dispatch(api.util.resetApiState());
        dispatch(unsetCredentials());
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
            {user.profileId === parseInt(id, 10) ? (
              <IonButton routerLink={`/profile/${id}/edit`}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
            ) : (
              <IonButton routerLink={`/chat/${id}`}>
                <IonIcon slot="icon-only" icon={chatbubbleOutline} />
              </IonButton>
            )}
            {user.profileId === parseInt(id, 10) && (
              <IonButton onClick={handleLogout}>
                <IonIcon slot="icon-only" icon={logOutOutline} />
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
                <IonButton routerLink={`/chat/${id}`}>
                  <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                </IonButton>
              )}
              {user.profileId === parseInt(id, 10) && (
                <IonButton onClick={handleLogout}>
                  <IonIcon slot="icon-only" icon={logOutOutline} />
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className={hasListings ? '' : styles.noListings}>
          <OfflineCard />

          <div className="ion-margin">
            <div className={styles.header}>
              <Avatar
                className={styles.avatar}
                name={profile?.name}
                maxInitials={2}
                size="4rem"
                round
              />
              <div>
                <h1 className="ion-no-margin">{profile?.name}</h1>
                {profile?.gender !== Gender.PNTS && (
                  <IonText color="dark">
                    {profile?.gender} <GenderIcon />
                  </IonText>
                )}
              </div>
            </div>

            <p className="ion-text-prewrap">{profile?.description}</p>
          </div>

          {hasListings ? (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Math, Science, English</IonCardTitle>
                  <IonCardSubtitle>Upper Primary</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  convallis ullamcorper tristique. Duis accumsan rhoncus dolor
                  eget laoreet.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Math, Science, English</IonCardTitle>
                  <IonCardSubtitle>Upper Primary</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  convallis ullamcorper tristique. Duis accumsan rhoncus dolor
                  eget laoreet.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Math, Science, English</IonCardTitle>
                  <IonCardSubtitle>Upper Primary</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  convallis ullamcorper tristique. Duis accumsan rhoncus dolor
                  eget laoreet.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Math, Science, English</IonCardTitle>
                  <IonCardSubtitle>Upper Primary</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  convallis ullamcorper tristique. Duis accumsan rhoncus dolor
                  eget laoreet.
                </IonCardContent>
              </IonCard>
            </>
          ) : (
            <EmptyPlaceholder
              icon={closeCircle}
              text={`${
                user.profileId === parseInt(id, 10)
                  ? 'You have'
                  : 'This person has'
              } no tutor/tutee listings.`}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
