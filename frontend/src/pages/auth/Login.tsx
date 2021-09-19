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
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { useLoginMutation } from '../../api/auth';
import { setCredentials } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';

import styles from './Login.module.scss';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const router = useIonRouter();
  const [present] = useIonToast();
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      const credentials = await login(data).unwrap();
      dispatch(setCredentials(credentials));

      if (credentials.profileId) {
        router.push('/');
      } else {
        router.push('/profile');
      }
    } catch (error) {
      if (window.navigator.onLine) {
        const message = (
          (error as FetchBaseQueryError).data as ErrorResponse
        ).errors
          .flatMap((errorMessage) => errorMessage.detail)
          .join(', ');

        setError('email', { message });
        setError('password', { message });
      } else {
        present({
          message: 'Unable to connect to the Internet',
          color: 'danger',
          duration: 2000,
        });
      }
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding h-100">
          <IonRow className="ion-align-items-center h-100">
            <IonCol className="ion-no-padding">
              <div className={styles.header}>
                <img className={styles.headerImg} src="/assets/icon/icon.png" />
                <h1 className={styles.headerName}>Tutorific</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.email ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Email</IonLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonInput
                        type="email"
                        onIonChange={onChange}
                        onIonBlur={onBlur}
                        value={value}
                      />
                    )}
                    rules={{
                      required: 'Email is required',
                    }}
                  />
                  {errors.email && (
                    <IonNote slot="helper" color="danger">
                      {errors.email.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.password ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Password</IonLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonInput
                        type="password"
                        onIonChange={onChange}
                        onIonBlur={onBlur}
                        value={value}
                      />
                    )}
                    rules={{
                      required: 'Password is required',
                    }}
                  />
                  {errors.password && (
                    <IonNote slot="helper" color="danger">
                      {errors.password.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonButton
                  className="ion-no-margin ion-margin-top"
                  expand="block"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <IonSpinner /> : 'Login'}
                </IonButton>
                <IonButton
                  className="ion-no-margin"
                  expand="block"
                  color="light"
                  routerLink="/register"
                  disabled={isLoading}
                >
                  Register
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
