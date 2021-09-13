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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../app/hooks';
import { useRegisterMutation } from '../../api/auth';
import { setCredentials } from '../../reducers/auth';

import styles from './Register.module.scss';

interface RegisterData {
  email: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    try {
      const result = await registerUser(data);

      if ('data' in result && result.data) {
        dispatch(setCredentials(result.data));
        history.push('/tutors');
      }
    } catch (err) {
      console.log(err);
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
              <div className={styles.welcomeHeader}>
                <img className={styles.welcomeImg} src="/assets/welcome.png" />
                <p className={styles.welcomeText}>
                  Welcome to Tutorific! Register an account to start looking for
                  tutors/tutees.
                </p>
              </div>
              <form
                className={styles.registerForm}
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
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.confirm_password ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Confirm Password</IonLabel>
                  <IonInput
                    type="password"
                    {...register('confirm_password', {
                      required: 'Password is required',
                      validate: {
                        match: (value) =>
                          value === getValues('password') ||
                          'Passwords need to match',
                      },
                    })}
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
