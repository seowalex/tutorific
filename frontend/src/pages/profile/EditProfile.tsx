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
import { useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import {
  Gender,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../api/profile';
import type { ErrorResponse } from '../../types/error';

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
  const {
    params: { id },
  } = useRouteMatch<Params>();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: profile } = useGetProfileQuery(parseInt(id, 10));

  const router = useIonRouter();
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
      router.push(`/profile/${id}`, 'back');
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
          <IonTitle>Edit Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/profile/${id}`} />
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

export default EditProfile;
