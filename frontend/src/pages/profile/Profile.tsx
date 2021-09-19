import React from 'react';
import {
  IonAvatar,
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
import {
  chatbubbleOutline,
  closeCircle,
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

import OfflineCard from '../../components/OfflineCard';

import styles from './Profile.module.scss';
import { unsetTutorListingFilters } from '../../reducers/tutorFilters';

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
  const { data: profile } = useGetProfileQuery(parseInt(id, 10));
  const hasListings = false;

  const router = useIonRouter();
  const [present] = useIonToast();

  const handleLogout = async () => {
    if (window.navigator.onLine) {
      try {
        if (user.id && user.refreshToken) {
          await logout({
            id: user.id,
            refreshToken: user.refreshToken,
          }).unwrap();
        }

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
        message: 'Unable to connect to the Internet',
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
          <IonButtons slot="primary" collapse>
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

        <div className={hasListings ? '' : styles.noListings}>
          <OfflineCard />

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
            <div className={styles.noListingsMessage}>
              <IonIcon className={styles.noListingsIcon} icon={closeCircle} />
              <p className="ion-no-margin">
                {user.profileId === parseInt(id, 10)
                  ? 'You have'
                  : 'This person has'}{' '}
                no tutor/tutee listings.
              </p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
