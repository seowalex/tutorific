import { FetchArgs } from '@reduxjs/toolkit/dist/query';
import { ObjectFlags } from 'typescript';
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
