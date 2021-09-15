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
  useIonToast,
} from '@ionic/react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { closeCircle, female, logOutOutline, male } from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLogoutMutation } from '../../api/auth';
import { useGetProfileQuery } from '../../api/profile';
import { selectCurrentUser, unsetCredentials } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';
import { Gender } from '../../types/profile';

import styles from './Profile.module.scss';

interface Params {
  id: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const [present] = useIonToast();

  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectCurrentUser);
  const { data: profile } = useGetProfileQuery(parseInt(id, 10));
  const hasListings = false;

  const handleLogout = async () => {
    try {
      if (user.id && user.refreshToken) {
        await logout({ id: user.id, refreshToken: user.refreshToken }).unwrap();
        dispatch(unsetCredentials());
        history.push('/login');
      }
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
    if (profile?.gender === Gender.Male) {
      return <IonIcon icon={male} />;
    }

    if (profile?.gender === Gender.Female) {
      return <IonIcon icon={female} />;
    }

    return null;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="primary" collapse>
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
              <IonButton onClick={handleLogout}>
                <IonIcon slot="icon-only" icon={logOutOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div
          className={`${styles.profileContainer} ${
            hasListings ? '' : styles.empty
          }`}
        >
          <div className="ion-margin">
            <div className={styles.profileHeader}>
              <IonAvatar className={styles.profileAvatar}>
                <img src="https://ui-avatars.com/api/?name=Seow+Alex&background=random" />
              </IonAvatar>
              <div>
                <h1 className="ion-no-margin">{profile?.name}</h1>
                <IonText color="dark">
                  {profile?.gender} <GenderIcon />
                </IonText>
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
            <div className={styles.emptyMessage}>
              <IonIcon className={styles.closeIcon} icon={closeCircle} />
              <p className="ion-no-margin">You have no tutor/tutee listings.</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
