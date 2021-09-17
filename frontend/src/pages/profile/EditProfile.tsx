import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
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

import ProfileForm, { ProfileData } from '../../components/ProfileForm';

interface Params {
  id: string;
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
              <ProfileForm
                isLoading={isLoading}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit(onSubmit)}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
