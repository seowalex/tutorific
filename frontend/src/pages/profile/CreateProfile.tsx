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
import { useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { useAddProfileMutation } from '../../api/profile';
import { setProfileId, setToken } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';

import ProfileForm, { ProfileData } from '../../components/ProfileForm';

const CreateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [addProfile, { isLoading }] = useAddProfileMutation();

  const router = useIonRouter();
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
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
              <ProfileForm
                isLoading={isLoading}
                errors={errors}
                handleSubmit={handleSubmit(onSubmit)}
                control={control}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
