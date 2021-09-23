import React from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonSpinner,
  IonToolbar,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { useLoginMutation } from '../../api/auth';
import { setCredentials } from '../../reducers/auth';
import { EventCategory, UserEventAction } from '../../types/analytics';
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
    reset,
    control,
  } = useForm<LoginData>();

  useIonViewWillEnter(() => reset());

  const onSubmit = async (data: LoginData) => {
    if (window.navigator.onLine) {
      try {
        const credentials = await login(data).unwrap();
        dispatch(setCredentials(credentials));

        ReactGA.event({
          category: EventCategory.User,
          action: UserEventAction.Login,
        });

        if (credentials.profileId) {
          router.push('/tutors');
        } else {
          router.push('/profile');
        }
      } catch (error) {
        const message = (
          (error as FetchBaseQueryError).data as ErrorResponse
        ).errors
          .flatMap((errorMessage) => errorMessage.detail)
          .join(', ');

        setError('email', { message });
        setError('password', { message });
      }
    } else {
      present({
        message: 'No internet connection',
        color: 'danger',
        duration: 2000,
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tutors" disabled={isLoading} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
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
                <input type="submit" hidden />
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
