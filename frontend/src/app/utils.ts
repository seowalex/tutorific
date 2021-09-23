import { SelectedTimeSlots, Subject, WeekDay } from '../types/listing';

const hoursInADay = 24;
const slotsPerHour = 2; // 00 and 30 mins
const slotsPerDay = hoursInADay * slotsPerHour;
const numberToWeekDay: Record<number, WeekDay> = {
  0: WeekDay.Mon,
  1: WeekDay.Tue,
  2: WeekDay.Wed,
  3: WeekDay.Thu,
  4: WeekDay.Fri,
  5: WeekDay.Sat,
  6: WeekDay.Sun,
};

export const baseUrl = 'https://tutorific.herokuapp.com';

// #region APIs

export const constructQueryString = (params: Record<string, any>): string => {
  if (params === {}) {
    return '';
  }

  const queryString = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((element) => queryString.append(key, element));
    } else if (value != null) {
      queryString.append(key, value);
    }
  });
  return `?${queryString.toString()}`;
};

// #endregion

// #region String Formatting

export const formatPriceRange = (priceMin: number, priceMax: number): string =>
  `$${priceMin} - ${priceMax}`;

export const formatStringList = (strings: string[]): string =>
  strings.join(', ');

export const formatTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// #endregion

// #region Subjects

export const mapSubject = (subject: string): string | undefined => {
  const commonSubjectsMap: Record<string, Subject> = {
    Math: Subject.Mathematics,
    Maths: Subject.Mathematics,
    Sci: Subject.Science,
    Eng: Subject.English,
  };

  return Object.keys(Subject).includes(subject)
    ? subject
    : commonSubjectsMap[subject];
};

// #endregion

// #region Time Slots

export const formatWeekDay = (weekDay: WeekDay): string => {
  switch (weekDay) {
    case WeekDay.Mon:
      return 'Monday';
    case WeekDay.Tue:
      return 'Tuesday';
    case WeekDay.Wed:
      return 'Wednesday';
    case WeekDay.Thu:
      return 'Thursday';
    case WeekDay.Fri:
      return 'Friday';
    case WeekDay.Sat:
      return 'Saturday';
    case WeekDay.Sun:
      return 'Sunday';
    default:
      return '';
  }
};

export const computeWeekDays = (timeSlots: number[]): string[] => {
  const weekDays = new Set<number>();

  for (let i = 0; i < timeSlots.length; i += 1) {
    const slot = timeSlots[i];

    if (slot >= 0 && slot < slotsPerDay * 7) {
      const weekDayNumber = Math.floor(slot / slotsPerDay);
      weekDays.add(weekDayNumber);
    }
  }

  return Array.from(weekDays)
    .sort()
    .map((number) => numberToWeekDay[number]);
};

export const getWeekDayNumber = (weekDay: WeekDay): number => {
  switch (weekDay) {
    case WeekDay.Mon:
      return 0;
    case WeekDay.Tue:
      return 1;
    case WeekDay.Wed:
      return 2;
    case WeekDay.Thu:
      return 3;
    case WeekDay.Fri:
      return 4;
    case WeekDay.Sat:
      return 5;
    case WeekDay.Sun:
      return 6;
    default:
      return -1;
  }
};

export const computeHour = (timeSlot: number): number =>
  Math.floor((timeSlot % slotsPerDay) / 2);

export const formatHour = (hour: number): string => {
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  // eslint-disable-next-line no-nested-ternary
  const suffix = hour === 0 ? 'mn' : hour < 12 ? 'am' : 'pm';

  return `${formattedHour}${suffix}`;
};

export const computeFirstTimeSlotOfDay = (day: WeekDay, startingHour: number) =>
  getWeekDayNumber(day) * slotsPerDay + startingHour * slotsPerHour;

export const calculateSlotNumber = (
  currentX: number,
  baseX: number,
  slotWidth: number
): number => Math.floor((currentX - baseX) / slotWidth);

export const arrayToSelectedTimeSlots = (
  slots: number[] | undefined
): SelectedTimeSlots =>
  slots ? slots.reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) : {};

export const selectedTimeSlotsToArray = (
  slots: SelectedTimeSlots | undefined
): number[] =>
  slots
    ? Object.keys(slots)
        .filter((key) => slots[parseInt(key, 10)])
        .map((key) => parseInt(key, 10))
    : [];

export const filterSlotsByDayAndRow = (
  slots: SelectedTimeSlots,
  firstTimeSlot: number,
  slotsPerRow: number
): SelectedTimeSlots =>
  slots
    ? {
        ...[...Array(slotsPerRow).keys()].map(
          (slotNumber) => slots[firstTimeSlot + slotNumber]
        ),
      }
    : {};

// #endregion
