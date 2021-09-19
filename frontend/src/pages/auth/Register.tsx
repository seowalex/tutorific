import React from 'react';
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
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { useRegisterMutation } from '../../api/auth';
import { setCredentials } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';

import styles from './Register.module.scss';

interface RegisterData {
  email: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const router = useIonRouter();
  const [present] = useIonToast();
  const {
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
    control,
  } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    if (window.navigator.onLine) {
      try {
        const credentials = await registerUser(data).unwrap();
        dispatch(setCredentials(credentials));

        if (credentials.profileId) {
          router.push('/');
        } else {
          router.push('/profile');
        }
      } catch (error) {
        const { errors: errorMessages } = (error as FetchBaseQueryError)
          .data as ErrorResponse;

        for (const errorMessage of errorMessages) {
          switch (errorMessage.field) {
            case 'email':
              setError('email', {
                message: errorMessage.detail.join(', '),
              });
              break;
            case 'password':
              setError('password', {
                message: errorMessage.detail.join(', '),
              });
              break;
            default:
              break;
          }
        }
      }
    } else {
      present({
        message: 'Unable to connect to the Internet',
        color: 'danger',
        duration: 2000,
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" disabled={isLoading} />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <div className={styles.header}>
                <img className={styles.headerImg} src="/assets/welcome.png" />
                <p className={styles.headerText}>
                  Welcome to Tutorific! Register an account to start looking for
                  tutors/tutees.
                </p>
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
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.confirm_password ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Confirm Password</IonLabel>
                  <Controller
                    name="confirm_password"
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
                      validate: {
                        match: (value) =>
                          value === getValues('password') ||
                          'Passwords need to match',
                      },
                    }}
                  />
                  {errors.confirm_password && (
                    <IonNote slot="helper" color="danger">
                      {errors.confirm_password.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonButton
                  className="ion-no-margin ion-margin-top"
                  expand="block"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <IonSpinner /> : 'Register'}
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
