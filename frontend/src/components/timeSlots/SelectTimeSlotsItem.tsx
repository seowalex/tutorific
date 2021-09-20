import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import { FieldErrors } from 'react-hook-form';
import {
  SelectedTimeSlots,
  TuteeListingFormData,
  TutorListingFormData,
  WeekDay,
} from '../../app/types';
import SelectTimeSlotsSlide from './SelectTimeSlotsSlide';
import { formatWeekDay } from '../../app/utils';

import styles from './TimeSlots.module.scss';

type ListingFormData = TutorListingFormData | TuteeListingFormData;

interface Props {
  onChange: (value: SelectedTimeSlots) => void;
  value: SelectedTimeSlots;
  errors?: FieldErrors<ListingFormData>;
  isSubmitting: boolean;
}

const SelectTimeSlotsItem: React.FC<Props> = (props) => {
  const { onChange, value, errors, isSubmitting } = props;
  const [weekDay, setWeekDay] = useState<WeekDay>(WeekDay.Mon);

  const handleSubmit = (
    firstTimeSlot: number,
    selectedSlots: SelectedTimeSlots
  ) => {
    const updatedValue = Object.entries(selectedSlots).reduce(
      (prev, [curr, isSelected]) => ({
        ...prev,
        [firstTimeSlot + parseInt(curr, 10)]: isSelected,
      }),
      value
    );

    onChange(updatedValue);
  };

  return (
    <>
      <IonItem
        fill="outline"
        lines="full"
        color={errors?.timeSlots ? 'danger' : undefined}
        disabled={isSubmitting}
      >
        <IonLabel position="stacked">
          {'Available Times: On '}
          <span className={styles.dayHeader}>{formatWeekDay(weekDay)}</span>
        </IonLabel>
        {Object.keys(WeekDay).map(
          (key) =>
            weekDay === (key as WeekDay) && (
              <SelectTimeSlotsSlide
                day={key as WeekDay}
                value={value}
                onSubmit={handleSubmit}
              />
            )
        )}
        {errors?.timeSlots && (
          <IonNote slot="helper" color="danger">
            {errors.timeSlots.message}
          </IonNote>
        )}
      </IonItem>
      <IonSegment
        scrollable
        value={weekDay}
        onIonChange={(e) => setWeekDay(e.detail.value as WeekDay)}
      >
        {Object.keys(WeekDay).map((key) => (
          <IonSegmentButton value={key as WeekDay}>
            <IonLabel>{key}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </>
  );
};

SelectTimeSlotsItem.defaultProps = {
  errors: undefined,
};

export default SelectTimeSlotsItem;
