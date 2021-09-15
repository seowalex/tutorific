import {
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
} from '@ionic/react';
import React from 'react';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import { TutorListing } from '../app/types';

import styles from './TutorListingForm.module.scss';

export interface TutorListingFormData {
  price: {
    lower: number;
    upper: number;
  };
  description: string;
  timeSlots: NestedValue<number[]>;
  subjects: NestedValue<string[]>;
  levels: NestedValue<string[]>;
}

interface Props {
  onSubmit: SubmitHandler<TutorListingFormData>;
  submitButtonText?: string;
  currentData?: TutorListing;
}

const TutorListingForm: React.FC<Props> = (props: Props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  const {
    register,
    formState: { errors, isSubmitting },
    watch,
    handleSubmit,
    getValues,
  } = useForm<TutorListingFormData>({
    defaultValues: currentData
      ? {
          price: {
            lower: currentData.priceMin,
            upper: currentData.priceMax,
          },
          description: currentData.description,
          timeSlots: currentData.timeSlots,
          subjects: currentData.subjects,
          levels: currentData.levels,
        }
      : {},
  });
  // const watchPrice = watch('price', { lower: 0, upper: 0 });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.price?.lower ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="floating">Min Price</IonLabel>
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
            <IonLabel position="floating">Max Price</IonLabel>
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
            <IonLabel position="floating">Subjects</IonLabel>
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
            color={errors.levels ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="floating">Education Levels</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('levels', {
                required: 'Please select at least one level',
                minLength: {
                  value: 1,
                  message: 'Please select at least one level',
                },
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
            {errors.levels && (
              <IonNote slot="helper" color="danger">
                {errors.levels.message}
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
            <IonLabel position="floating">Available Days</IonLabel>
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
            color={errors.description ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="floating">Description</IonLabel>
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

TutorListingForm.defaultProps = {
  submitButtonText: 'Submit',
  currentData: undefined,
};

export default TutorListingForm;
