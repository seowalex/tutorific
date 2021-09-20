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
import {
  Controller,
  NestedValue,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Level, SelectedTimeSlots, Subject, TutorListing } from '../app/types';
import SelectTimeSlotsItem from './timeSlots/SelectTimeSlotsItem';

import styles from './ListingForm.module.scss';
import { arrayToSelectedTimeSlots } from '../app/utils';

export interface TutorListingFormData {
  price: {
    lower: number;
    upper: number;
  };
  description: string;
  timeSlots: NestedValue<SelectedTimeSlots>;
  subjects: NestedValue<string[]>;
  levels: NestedValue<Level[]>;
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
    control,
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
          timeSlots: arrayToSelectedTimeSlots(currentData.timeSlots),
          subjects: currentData.subjects,
          levels: currentData.levels,
        }
      : {},
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <IonRow>
        <IonCol>
          <Controller
            name="timeSlots"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectTimeSlotsItem
                onChange={onChange}
                value={value}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            )}
          />
        </IonCol>
      </IonRow>
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
              {Object.keys(Subject).map((key) => (
                <IonSelectOption value={key}>
                  {Object(Subject)[key]}
                </IonSelectOption>
              ))}
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
            <IonLabel position="stacked">Education Levels</IonLabel>
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
              {Object.values(Level).map((value) => (
                <IonSelectOption value={value}>{value}</IonSelectOption>
              ))}
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
    </form>
  );
};

TutorListingForm.defaultProps = {
  submitButtonText: 'Submit',
  currentData: undefined,
};

export default TutorListingForm;
