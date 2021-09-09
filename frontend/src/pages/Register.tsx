import React from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Register.scss';

const Register: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/login" />
        </IonButtons>
        <IonTitle>Register</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="ion-margin-horizontal">
        <p className="onboarding-text">
          Welcome to Tutorific! Register an account to start looking for
          tutors/tutees.
        </p>
        <form>
          <IonItem className="ion-margin-vertical" fill="outline">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput />
          </IonItem>
          <IonItem className="ion-margin-vertical" fill="outline">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput />
          </IonItem>
          <IonItem className="ion-margin-vertical" fill="outline">
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput />
          </IonItem>
          <div className="form-buttons">
            <IonButton
              className="ion-margin-vertical"
              expand="block"
              routerLink="/tutors"
            >
              Register
            </IonButton>
          </div>
        </form>
      </div>
    </IonContent>
  </IonPage>
);

export default Register;
