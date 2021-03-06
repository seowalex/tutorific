import React from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonSpinner,
  IonToolbar,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { useRegisterMutation } from '../../api/auth';
import { setCredentials } from '../../reducers/auth';
import { EventCategory, UserEventAction } from '../../types/analytics';
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
    reset,
    control,
  } = useForm<RegisterData>();

  useIonViewWillEnter(() => reset());

  const onSubmit = async (data: RegisterData) => {
    if (window.navigator.onLine) {
      try {
        const credentials = await registerUser(data).unwrap();
        dispatch(setCredentials(credentials));

        ReactGA.event({
          category: EventCategory.User,
          action: UserEventAction.Create,
        });

        if (credentials.profileId) {
          router.push('/tutors');
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
            <IonBackButton defaultHref="/login" disabled={isLoading} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
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
          <input type="submit" hidden />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
