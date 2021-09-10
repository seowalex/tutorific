import React from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log(data);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (data.password === 'password') {
          history.push('/tutors');
        } else {
          setError('email', {
            message: 'Email or password is invalid',
          });
          setError('password', {
            message: 'Email or password is invalid',
          });
        }

        resolve();
      }, 2000);
    });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding h-100">
          <IonRow className="ion-align-items-center h-100">
            <IonCol className="ion-no-padding">
              <div className={styles.brandHeader}>
                <img className={styles.brandImg} src="/assets/icon/icon.png" />
                <h1 className={`${styles.brandName} ion-text-center`}>
                  Tutorific
                </h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonItem
                  className="ion-margin-vertical"
                  fill="outline"
                  lines="full"
                  color={errors.email ? 'danger' : undefined}
                  disabled={isSubmitting}
                >
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />
                  {errors.email && (
                    <IonNote slot="helper" color="danger">
                      {errors.email.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonItem
                  className="ion-margin-vertical"
                  fill="outline"
                  lines="full"
                  color={errors.password ? 'danger' : undefined}
                  disabled={isSubmitting}
                >
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors.password && (
                    <IonNote slot="helper" color="danger">
                      {errors.password.message}
                    </IonNote>
                  )}
                </IonItem>
                <div className="ion-padding-top">
                  <IonButton
                    className="ion-margin-vertical"
                    expand="block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <IonSpinner /> : 'Login'}
                  </IonButton>
                  <IonButton
                    className="ion-margin-vertical"
                    expand="block"
                    color="light"
                    routerLink="/register"
                    disabled={isSubmitting}
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
};

export default Login;
