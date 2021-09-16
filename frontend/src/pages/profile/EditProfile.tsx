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
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../api/profile';
import type { ErrorResponse } from '../../types/error';
import type { Gender } from '../../types/profile';

import styles from './EditProfile.module.scss';

interface Params {
  id: string;
}

interface ProfileData {
  name: string;
  gender: Gender;
  description: string;
}

const EditProfile: React.FC = () => {
  const history = useIonRouter();
  const {
    params: { id },
  } = useRouteMatch<Params>();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: profile } = useGetProfileQuery(parseInt(id, 10));
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ProfileData>({
    defaultValues: profile,
  });

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateProfile({ id: parseInt(id, 10), ...data }).unwrap();
      history.push(`/profile/${id}`, 'back');
    } catch (error) {
      const { errors: errorResponse } = (error as FetchBaseQueryError)
        .data as ErrorResponse;
      const nameErrorMessage = errorResponse
        .find((errorMessage) => errorMessage.field === 'name')
        ?.detail.join(', ');
      const genderErrorMessage = errorResponse
        .find((errorMessage) => errorMessage.field === 'gender')
        ?.detail.join(', ');
      const descriptionErrorMessage = errorResponse
        .find((errorMessage) => errorMessage.field === 'description')
        ?.detail.join(', ');

      if (nameErrorMessage) {
        setError('name', {
          message: nameErrorMessage,
        });
      }

      if (genderErrorMessage) {
        setError('gender', {
          message: genderErrorMessage,
        });
      }

      if (descriptionErrorMessage) {
        setError('description', {
          message: descriptionErrorMessage,
        });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit Profile</IonTitle>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <form
                className={styles.profileForm}
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  color={errors.description ? 'danger' : undefined}
                  disabled={isLoading}
                >
                  <IonLabel position="floating">Description</IonLabel>
                  <IonTextarea
                    {...register('description', {
                      required: 'Description is required',
                    })}
                  />
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

export default EditProfile;
