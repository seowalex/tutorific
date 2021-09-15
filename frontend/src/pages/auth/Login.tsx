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

  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      const credentials = await login(data).unwrap();

      dispatch(setCredentials(credentials));
      history.push('/tutors');
    } catch (error) {
      const { errors: errorResponse } = (error as FetchBaseQueryError)
        .data as ErrorResponse;
      const message = errorResponse
        .flatMap((errorMessage) => errorMessage.detail)
        .join(', ');

      setError('email', { message });
      setError('password', { message });
    }
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
              <form
                className={styles.loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.email ? 'danger' : undefined}
                  disabled={isLoading}
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
                  fill="outline"
                  lines="full"
                  color={errors.password ? 'danger' : undefined}
                  disabled={isLoading}
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
