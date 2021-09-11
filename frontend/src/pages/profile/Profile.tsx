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
import { male, search } from 'ionicons/icons';

import styles from './Profile.module.scss';

const Profile: React.FC = () => (
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
          <h1 className={styles.profileName}>Seow Alex</h1>
          <IonIcon
            className={styles.profileGender}
            icon={male}
            size="large"
            color="secondary"
          />
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          convallis ullamcorper tristique. Duis accumsan rhoncus dolor eget
          laoreet.
        </p>
      </div>

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

export default Profile;
