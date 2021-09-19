import { WeekDay } from './types';

export const formatPriceRange = (priceMin: number, priceMax: number): string =>
  `$${priceMin} - ${priceMax}`;

export const formatStringList = (strings: string[]): string =>
  strings.join(', ');

export const computeWeekDays = (timeSlots: number[]): string[] => {
  const hoursInADay = 24;
  const slotsPerHour = 2; // 00 and 30 mins
  const slotsPerDay = hoursInADay * slotsPerHour;

  const weekDays = new Set<WeekDay>();
  const numberToWeekDay: { [key: number]: WeekDay } = {
    0: WeekDay.Monday,
    1: WeekDay.Tuesday,
    2: WeekDay.Wednesday,
    3: WeekDay.Thursday,
    4: WeekDay.Friday,
    5: WeekDay.Saturday,
    6: WeekDay.Sunday,
  };

  for (let i = 0; i < timeSlots.length; i += 1) {
    const slot = timeSlots[i];

    if (slot >= 0 && slot < slotsPerDay * 7) {
      const weekDayNumber = Math.floor(slot / slotsPerDay);
      weekDays.add(numberToWeekDay[weekDayNumber]);
    }
  }

  return Array.from(weekDays);
};
