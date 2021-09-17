import React from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Gender } from '../api/profile';

import styles from './ProfileForm.module.scss';

export interface ProfileData {
  name: string;
  gender: Gender;
  description: string;
}

interface Props {
  isLoading: boolean;
  register: UseFormRegister<ProfileData>;
  errors: FieldErrors<ProfileData>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const ProfileForm: React.FC<Props> = ({
  isLoading,
  register,
  errors,
  handleSubmit,
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
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
);

export default ProfileForm;
