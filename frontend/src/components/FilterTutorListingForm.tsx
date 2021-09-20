import React from 'react';
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
} from '@ionic/react';
import {
  Controller,
  NestedValue,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Gender, Level, SelectedTimeSlots, Subject } from '../app/types';
import { TutorFiltersState } from '../reducers/tutorFilters';

import styles from './ListingForm.module.scss';
import { arrayToSelectedTimeSlots } from '../app/utils';
import SelectTimeSlotsItem from './timeSlots/SelectTimeSlotsItem';

export interface FilterTutorListingFormData {
  priceMin?: number;
  priceMax?: number;
  timeSlots: NestedValue<SelectedTimeSlots>;
  subjects?: NestedValue<string[]>;
  levels?: NestedValue<Level[]>;
  gender?: Gender;
}

interface Props {
  onSubmit: SubmitHandler<FilterTutorListingFormData>;
  submitButtonText?: string;
  currentData?: TutorFiltersState;
}

const FilterTutorListingForm: React.FC<Props> = (props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  const emptyFilters = {
    priceMin: undefined,
    priceMax: undefined,
    timeSlots: {},
    subjects: [],
    levels: [],
    gender: undefined,
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    getValues,
  } = useForm<FilterTutorListingFormData>({
    defaultValues: currentData
      ? {
          ...currentData,
          timeSlots: arrayToSelectedTimeSlots(currentData.timeSlots),
        }
      : emptyFilters,
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
                value={value ?? {}}
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
            color={errors.priceMin ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Min Price</IonLabel>
            <Controller
              name="priceMin"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  type="number"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                />
              )}
              rules={{
                min: {
                  value: 0,
                  message: 'Min Price must be positive',
                },
              }}
            />
            {errors.priceMin && (
              <IonNote slot="helper" color="danger">
                {errors.priceMin.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.priceMax ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Max Price</IonLabel>
            <Controller
              name="priceMax"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  type="number"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                />
              )}
              rules={{
                min: {
                  value: 0,
                  message: 'Max Price must be positive',
                },
                validate: {
                  atLeastMin: (value) => {
                    const priceMin = getValues('priceMin');
                    return (
                      value == null ||
                      priceMin == null ||
                      Number.isNaN(value) ||
                      Number.isNaN(priceMin) ||
                      priceMin <= value ||
                      'Max Price must be at least Min Price'
                    );
                  },
                },
              }}
            />
            {errors.priceMax && (
              <IonNote slot="helper" color="danger">
                {errors.priceMax.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Subjects</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('subjects')}
            >
              {Object.keys(Subject).map((key) => (
                <IonSelectOption value={key}>
                  {Object(Subject)[key]}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Education Levels</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('levels')}
            >
              {Object.values(Level).map((value) => (
                <IonSelectOption value={value}>{value}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Gender</IonLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonSelect
                  cancelText="Cancel"
                  okText="OK"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                >
                  {Object.values(Gender).map((gender) =>
                    gender === Gender.PNTS ? (
                      <IonSelectOption value={null}>
                        No Preference
                      </IonSelectOption>
                    ) : (
                      <IonSelectOption value={gender}>{gender}</IonSelectOption>
                    )
                  )}
                </IonSelect>
              )}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonButton expand="block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <IonSpinner /> : submitButtonText}
      </IonButton>
      <IonButton
        expand="block"
        type="button"
        disabled={isSubmitting}
        fill="outline"
        onClick={() => reset(emptyFilters)}
      >
        {isSubmitting ? <IonSpinner /> : 'Clear All'}
      </IonButton>
    </form>
  );
};

FilterTutorListingForm.defaultProps = {
  submitButtonText: 'Search',
  currentData: undefined,
};

export default FilterTutorListingForm;
