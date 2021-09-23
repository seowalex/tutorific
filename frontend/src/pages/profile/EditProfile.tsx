import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
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
import { EventCategory, ProfileEventAction } from '../../types/analytics';

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
  const [present] = useIonToast();
  const {
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    control,
  } = useForm<ProfileData>();

  useEffect(() => reset(profile), [reset, profile]);

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateProfile({ id: parseInt(id, 10), ...data }).unwrap();
      ReactGA.event({
        category: EventCategory.Profile,
        action: ProfileEventAction.Update,
      });
      router.push(`/profile/${id}`, 'back');
    } catch (error) {
      if (window.navigator.onLine) {
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
      } else {
        present({
          header: 'No Internet Connection',
          message: 'Profile will be updated when you are online',
          duration: 5000,
        });
        router.push(`/profile/${id}`, 'back');
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
        <ProfileForm
          isLoading={isLoading}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          control={control}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
