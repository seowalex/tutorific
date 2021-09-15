import {
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
} from '@ionic/react';
import React from 'react';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import { Gender, Town, TuteeListing } from '../app/types';

import styles from './ListingForm.module.scss';

export interface TuteeListingFormData {
  price: {
    lower: number;
    upper: number;
  };
  description: string;
  timeSlots: NestedValue<number[]>;
  subjects: NestedValue<string[]>;
  level: string;
  gender: Gender;
  location: Town;
}

interface Props {
  onSubmit: SubmitHandler<TuteeListingFormData>;
  submitButtonText?: string;
  currentData?: TuteeListing;
}

const TuteeListingForm: React.FC<Props> = (props: Props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<TuteeListingFormData>({
    defaultValues: currentData
      ? {
          price: {
            lower: currentData.priceMin,
            upper: currentData.priceMax,
          },
          description: currentData.description,
          timeSlots: currentData.timeSlots,
          subjects: currentData.subjects,
          level: currentData.level,
          gender: currentData.gender,
          location: currentData.location,
        }
      : {},
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <IonRow className={styles.priceInputsRow}>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.price?.lower ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Min Price</IonLabel>
            <IonInput
              type="number"
              {...register('price.lower', {
                required: 'Min Price is required',
                min: {
                  value: 0,
                  message: 'Min Price must be positive',
                },
                valueAsNumber: true,
              })}
            />
            {errors.price?.lower && (
              <IonNote slot="helper" color="danger">
                {errors.price.lower.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.price?.upper ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Max Price</IonLabel>
            <IonInput
              type="number"
              {...register('price.upper', {
                required: 'Max Price is required',
                min: {
                  value: 0,
                  message: 'Max Price must be positive',
                },
                valueAsNumber: true,
                validate: {
                  atLeastMin: (value) =>
                    getValues('price.lower') <= value ||
                    'Max Price must be at least Min Price',
                },
              })}
            />
            {errors.price?.upper && (
              <IonNote slot="helper" color="danger">
                {errors.price.upper.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.subjects ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Subjects</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('subjects', {
                required: 'Please select at least one subject',
                minLength: {
                  value: 1,
                  message: 'Please select at least one subject',
                },
              })}
            >
              <IonSelectOption value="Math">Mathematics</IonSelectOption>
              <IonSelectOption value="Science">Science</IonSelectOption>
              <IonSelectOption value="English">English</IonSelectOption>
              <IonSelectOption value="Chinese">Chinese</IonSelectOption>
            </IonSelect>
            {errors.subjects && (
              <IonNote slot="helper" color="danger">
                {errors.subjects.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.level ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Education Level</IonLabel>
            <IonSelect
              cancelText="Cancel"
              okText="OK"
              {...register('level', {
                required: 'Please select a level',
              })}
            >
              <IonSelectOption value="Lower Primary">
                Lower Primary
              </IonSelectOption>
              <IonSelectOption value="Upper Primary">
                Upper Primary
              </IonSelectOption>
              <IonSelectOption value="Lower Secondary">
                Lower Secondary
              </IonSelectOption>
              <IonSelectOption value="Upper Secondary">
                Upper Secondary
              </IonSelectOption>
              <IonSelectOption value="Junior College">
                Junior College
              </IonSelectOption>
            </IonSelect>
            {errors.level && (
              <IonNote slot="helper" color="danger">
                {errors.level.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.timeSlots ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Available Days</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('timeSlots', {
                required: 'Please select at least one day',
                minLength: {
                  value: 1,
                  message: 'Please select at least one day',
                },
              })}
            >
              <IonSelectOption value={0}>Mon</IonSelectOption>
              <IonSelectOption value={48}>Tue</IonSelectOption>
              <IonSelectOption value={96}>Wed</IonSelectOption>
              <IonSelectOption value={144}>Thu</IonSelectOption>
              <IonSelectOption value={192}>Fri</IonSelectOption>
              <IonSelectOption value={240}>Sat</IonSelectOption>
              <IonSelectOption value={288}>Sun</IonSelectOption>
            </IonSelect>
            {errors.timeSlots && (
              <IonNote slot="helper" color="danger">
                {errors.timeSlots.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.gender ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Gender</IonLabel>
            <IonSelect
              cancelText="Cancel"
              okText="OK"
              {...register('gender', {
                required: 'Please select a gender',
              })}
            >
              <IonSelectOption value="Male">Male</IonSelectOption>
              <IonSelectOption value="Female">Female</IonSelectOption>
              <IonSelectOption value="Prefer not to say">
                Prefer not to say
              </IonSelectOption>
            </IonSelect>
            {errors.gender && (
              <IonNote slot="helper" color="danger">
                {errors.gender.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.location ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Location</IonLabel>
            <IonSelect
              cancelText="Cancel"
              okText="OK"
              {...register('location', {
                required: 'Please select a location',
              })}
            >
              {Object.values(Town).map((value) => (
                <IonSelectOption value={value.toString()}>
                  {value.toString()}
                </IonSelectOption>
              ))}
            </IonSelect>
            {errors.location && (
              <IonNote slot="helper" color="danger">
                {errors.location.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.description ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea rows={5} {...register('description')} />
            {errors.description && (
              <IonNote slot="helper" color="danger">
                {errors.description}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonButton expand="block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <IonSpinner /> : submitButtonText}
      </IonButton>
      {/* <IonRange
        dualKnobs
        min={0} 
        max={150} 
        pin 
        value={watchPrice} 
        {...register('price')}
      /> */}
    </form>
  );
};

TuteeListingForm.defaultProps = {
  submitButtonText: 'Submit',
  currentData: undefined,
};

export default TuteeListingForm;
