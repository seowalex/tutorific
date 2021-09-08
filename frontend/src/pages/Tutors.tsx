import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { search } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';

import './Tutors.scss';

const Tutors: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tutors</IonTitle>
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
          <IonTitle size="large">Tutors</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer />
    </IonContent>
  </IonPage>
);

export default Tutors;
