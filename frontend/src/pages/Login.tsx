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
    <IonContent>
      <IonGrid className="h-100" fixed>
        <IonRow className="h-100 ion-margin-horizontal ion-align-items-center">
          <IonCol sizeSm="8" offsetSm="2" sizeLg="6" offsetLg="3">
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

export default Login;
