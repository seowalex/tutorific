import React, { useState } from 'react';

import { createGesture, Gesture, GestureConfig } from '@ionic/core';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { GestureCallback } from '@ionic/core/dist/types/utils/gesture';
import clsx from 'clsx';

import styles from './TimeSlots.module.scss';
import { calculateSlotNumber, computeHour, formatHour } from '../../app/utils';
import { SelectedTimeSlots } from '../../app/types';

enum DragDirection {
  Left,
  Right,
}

interface Props {
  firstTimeSlot: number;
  numberOfSlots: number;
  value: SelectedTimeSlots;
  onSubmit: (firstTimeSlot: number, selectedSlots: SelectedTimeSlots) => void;
}

const SelectTimeSlotsRow: React.FC<Props> = (props) => {
  const { firstTimeSlot, numberOfSlots, value, onSubmit } = props;
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [selectedSlots, setSelectedSlots] = useState<SelectedTimeSlots>(value);

  React.useEffect(() => {
    if (boxRef.current) {
      const getBoxDimensions = (boxElement: HTMLDivElement | null) => {
        const boxDimensions = boxElement?.getBoundingClientRect();
        const baseX = boxDimensions?.x ?? 0;
        const slotWidth = (boxDimensions?.width ?? 0) / numberOfSlots;
        return { baseX, slotWidth };
      };

      const handleStart: GestureCallback = (detail) => {
        const { baseX, slotWidth } = getBoxDimensions(boxRef.current);
        const initialSlot = calculateSlotNumber(
          detail.startX,
          baseX,
          slotWidth
        );
        setSelectedSlots((s) => ({ ...s, [initialSlot]: !s[initialSlot] }));
      };

      const handleMove: GestureCallback = (detail) => {
        const { baseX, slotWidth } = getBoxDimensions(boxRef.current);
        const initialSlot = calculateSlotNumber(
          detail.startX,
          baseX,
          slotWidth
        );
        const currentSlot = calculateSlotNumber(
          detail.currentX,
          baseX,
          slotWidth
        );
        const initialDragDirection =
          detail.currentX - detail.startX > 0
            ? DragDirection.Left
            : DragDirection.Right;
        const currentDragDirection =
          detail.velocityX > 0 ? DragDirection.Left : DragDirection.Right;
        const isSameDragDirectionAsInitial =
          initialDragDirection === currentDragDirection;
        const currentIsSelected = isSameDragDirectionAsInitial
          ? !selectedSlots[initialSlot]
          : selectedSlots[initialSlot];

        setSelectedSlots((s) => ({ ...s, [currentSlot]: currentIsSelected }));
      };

      const handleEnd: GestureCallback = () => {
        setSelectedSlots((s) => {
          onSubmit(firstTimeSlot, s);
          return s;
        });
      };

      const options: GestureConfig = {
        el: boxRef.current,
        disableScroll: true,
        direction: 'x',
        gestureName: `slot_${firstTimeSlot}`,
        onStart: handleStart,
        onMove: handleMove,
        onEnd: handleEnd,
      };

      const gesture: Gesture = createGesture(options);
      gesture.enable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlots]);

  React.useEffect(() => {
    if (Object.values(value).every((element) => element == null)) {
      setSelectedSlots({});
    }
  }, [value, setSelectedSlots]);

  return (
    <>
      <div ref={boxRef}>
        <IonGrid className="ion-no-padding">
          <IonRow className={clsx('ion-no-padding', styles.timeSlotRow)}>
            {[...Array(numberOfSlots).keys()].map((slot) => {
              const timeSlot = firstTimeSlot + slot;
              const isFirstHalfHour = timeSlot % 2 === 0;
              const hour = computeHour(timeSlot);
              return (
                <IonCol>
                  <div
                    className={clsx(
                      styles.timeSlotBox,
                      isFirstHalfHour
                        ? styles.firstHalfHourSlot
                        : styles.secondHalfHourSlot,
                      selectedSlots[slot] ? styles.slotFilled : null
                    )}
                  >
                    <span className={styles.timeSlotSpan}>
                      {isFirstHalfHour && formatHour(hour)}
                    </span>
                  </div>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};

export default SelectTimeSlotsRow;
