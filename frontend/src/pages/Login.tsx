import React from 'react';
import {
  IonButton,
  IonContent,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';

import './Login.scss';

const Login: React.FC = () => (
  <IonPage>
    <IonContent>
      <div className="ion-margin-horizontal">
        <div className="brand-header">
          <IonImg className="brand-img" src="/assets/icon/icon.png" />
          <h1 className="ion-text-center brand-name">Tutorific</h1>
        </div>
        <form>
          <IonItem className="ion-margin-vertical" fill="outline">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput />
          </IonItem>
          <IonItem className="ion-margin-vertical" fill="outline">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput />
          </IonItem>
          <div className="form-buttons">
            <IonButton
              className="ion-margin-vertical"
              expand="block"
              routerLink="/tutors"
            >
              Login
            </IonButton>
            <IonButton
              className="ion-margin-vertical"
              expand="block"
              color="light"
              routerLink="/register"
            >
              Register
            </IonButton>
          </div>
        </form>
      </div>
    </IonContent>
  </IonPage>
);

export default Login;
