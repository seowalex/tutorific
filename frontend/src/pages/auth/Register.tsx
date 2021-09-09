import React from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
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
      <IonGrid className="ion-margin-horizontal h-100">
        <IonRow class="ion-align-items-center h-100">
          <IonCol>
            <div className="welcome-header">
              <IonImg className="welcome-img" src="/assets/welcome.png" />
              <p className="welcome-text">
                Welcome to Tutorific! Register an account to start looking for
                tutors/tutees.
              </p>
            </div>
            <form>
              <IonItem className="ion-margin-vertical" fill="outline">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" />
              </IonItem>
              <IonItem className="ion-margin-vertical" fill="outline">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" />
              </IonItem>
              <IonItem className="ion-margin-vertical" fill="outline">
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput type="password" />
              </IonItem>
              <div className="ion-padding-top">
                <IonButton
                  className="ion-margin-vertical"
                  expand="block"
                  routerLink="/tutors"
                >
                  Register
                </IonButton>
              </div>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

export default Register;
