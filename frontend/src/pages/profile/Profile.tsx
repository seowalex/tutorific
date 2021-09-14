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
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { search } from 'ionicons/icons';
import { useHistory } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser, unsetCredentials } from '../../reducers/auth';
import { useLogoutMutation } from '../../api/auth';
import { useGetUserQuery } from '../../api/user';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();
  const history = useHistory();
  const { data: profile } = useGetUserQuery(user.id ?? 0);

  const handleLogout = async () => {
    try {
      if (user.id && user.refreshToken) {
        await logout({ id: user.id, refreshToken: user.refreshToken });
        dispatch(unsetCredentials());
        history.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
            <IonButtons slot="primary">
              <IonButton>
                <IonIcon slot="icon-only" icon={search} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="ion-margin">
          <div className={styles.profileHeader}>
            <IonAvatar className={styles.profileAvatar}>
              <img src="https://ui-avatars.com/api/?name=Seow+Alex&background=random" />
            </IonAvatar>
            <h1 className={styles.profileName}>{profile?.name}</h1>
            <h2>{profile?.gender}</h2>
          </div>

          <p>{profile?.description}</p>
        </div>

        <IonButton onClick={handleLogout}>Logout</IonButton>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Math, Science, English</IonCardTitle>
            <IonCardSubtitle>Upper Primary</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis ullamcorper tristique. Duis accumsan rhoncus dolor eget
            laoreet.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
