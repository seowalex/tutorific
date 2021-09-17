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
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { Gender, useAddProfileMutation } from '../../api/profile';
import { setProfileId, setToken } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';

import styles from './CreateProfile.module.scss';

interface ProfileData {
  name: string;
  gender: Gender;
  description: string;
}

const CreateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [addProfile, { isLoading }] = useAddProfileMutation();

  const router = useIonRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ProfileData>();

  const onSubmit = async (data: ProfileData) => {
    try {
      const profile = await addProfile(data).unwrap();

      if (profile.profileId && profile.token) {
        dispatch(setProfileId(profile.profileId));
        dispatch(setToken(profile.token));
      }

      router.push('/');
    } catch (error) {
      const { errors: errorMessages } = (error as FetchBaseQueryError)
        .data as ErrorResponse;

      for (const errorMessage of errorMessages) {
        switch (errorMessage.field) {
          case 'name':
            setError('name', {
              message: errorMessage.detail.join(', '),
            });
            break;
          case 'gender':
            setError('gender', {
              message: errorMessage.detail.join(', '),
            });
            break;
          case 'description':
            setError('description', {
              message: errorMessage.detail.join(', '),
            });
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.name ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput
                    {...register('name', {
                      required: 'Name is required',
                    })}
                  />
                  {errors.name && (
                    <IonNote slot="helper" color="danger">
                      {errors.name.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.gender ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Gender</IonLabel>
                  <IonSelect
                    {...register('gender', {
                      required: 'Gender is required',
                    })}
                  >
                    {Object.values(Gender).map((gender) => (
                      <IonSelectOption value={gender}>{gender}</IonSelectOption>
                    ))}
                  </IonSelect>
                  {errors.gender && (
                    <IonNote slot="helper" color="danger">
                      {errors.gender.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonItem
                  fill="outline"
                  lines="full"
                  color={errors.description ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Description</IonLabel>
                  <IonTextarea {...register('description')} />
                  {errors.description && (
                    <IonNote slot="helper" color="danger">
                      {errors.description.message}
                    </IonNote>
                  )}
                </IonItem>
                <IonButton
                  className="ion-no-margin ion-margin-top"
                  expand="block"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <IonSpinner /> : 'Save'}
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
