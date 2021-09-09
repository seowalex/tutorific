import React from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from '@ionic/react';

import './Login.scss';

const Login: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <IonGrid className="ion-margin-horizontal h-100">
        <IonRow class="ion-align-items-center h-100">
          <IonCol>
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
              <div className="ion-padding-top">
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
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

export default Login;
