import React from 'react';

import { IonCol, IonGrid, IonRow } from '@ionic/react';

import { SelectedTimeSlots, WeekDay } from '../../app/types';
import styles from './TimeSlots.module.scss';
import {
  computeFirstTimeSlotOfDay,
  filterSlotsByDayAndRow,
} from '../../app/utils';
import SelectTimeSlotsRow from './SelectTimeSlotsRow';

interface Props {
  day: WeekDay;
  value: SelectedTimeSlots;
  disabled?: boolean;
  onSubmit?: (firstTimeSlot: number, selectedSlots: SelectedTimeSlots) => void;
}

const SelectTimeSlotsSlide: React.FC<Props> = (props) => {
  const { day, value, disabled, onSubmit } = props;
  const startingHour = 6; // start at 6am
  const numberOfRows = 4; // 4 rows
  const slotsPerRow = 8;
  const firstTimeSlotOfDay = computeFirstTimeSlotOfDay(day, startingHour);

  return (
    <IonGrid className={styles.timeSlotSlideContainer}>
      {[...Array(numberOfRows).keys()].map((row) => (
        <IonRow>
          <IonCol>
            <SelectTimeSlotsRow
              firstTimeSlot={firstTimeSlotOfDay + row * slotsPerRow}
              numberOfSlots={slotsPerRow}
              value={filterSlotsByDayAndRow(
                value,
                firstTimeSlotOfDay + row * slotsPerRow,
                slotsPerRow
              )}
              disabled={disabled}
              onSubmit={onSubmit}
            />
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

SelectTimeSlotsSlide.defaultProps = {
  disabled: false,
  onSubmit: undefined,
};

export default SelectTimeSlotsSlide;
