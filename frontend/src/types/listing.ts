import type { NestedValue } from 'react-hook-form';
import type { Gender, Profile } from './profile';

export enum ListingType {
  Tutor = 'Tutor',
  Tutee = 'Tutee',
}

export enum Level {
  LowerPrimary = 'Lower Primary',
  UpperPrimary = 'Upper Primary',
  LowerSecondary = 'Lower Secondary',
  UpperSecondary = 'Upper Secondary',
  JC = 'Junior College',
}

export enum Subject {
  Mathematics = 'Mathematics',
  English = 'English',
  Science = 'Science',
  Chinese = 'Chinese',
  Malay = 'Malay',
  Tamil = 'Tamil',
  Geography = 'Geography',
  History = 'History',
  EnglishLiterature = 'English Literature',
  Physics = 'Physics',
  Chemistry = 'Chemistry',
  Biology = 'Biology',
  Art = 'Art',
  Music = 'Music',
  GeneralPaper = 'General Paper',
  Economics = 'Economics'
}

export enum Town {
  AMK = 'Ang Mo Kio',
  BDK = 'Bedok',
  BIS = 'Bishan',
  BKB = 'Bukit Batok',
  BKM = 'Bukit Merah',
  BKP = 'Bukit Panjang',
  BKT = 'Bukit Timah',
  CEN = 'Central Area',
  CCK = 'Choa Chu Kang',
  CLM = 'Clementi',
  GEY = 'Geylang',
  HOU = 'Hougang',
  JRE = 'Jurong East',
  JRW = 'Jurong West',
  KAL = 'Kallang/Whampoa',
  LCK = 'Lim Chu Kang',
  MRP = 'Marine Parade',
  PGL = 'Punggol',
  PSR = 'Pasir Ris',
  QUE = 'Queenstown',
  SBW = 'Sembawang',
  SNK = 'Sengkang',
  SRG = 'Serangoon',
  SIM = 'Simei',
  TPN = 'Tampines',
  TPY = 'Toa Payoh',
  WDL = 'Woodlands',
  YCK = 'Yio Chu Kang',
  YIS = 'Yishun',
}

export enum WeekDay {
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun',
}

export interface TutorListing {
  id: number;
  tutor: Profile;
  priceMin: number;
  priceMax: number;
  description: string;
  timeSlots: number[];
  subjects: string[];
  levels: Level[];
  createdAt: Date;
}

export interface TutorListingFormData {
  price: {
    lower: number;
    upper: number;
  };
  description: string;
  timeSlots: NestedValue<SelectedTimeSlots>;
  subjects: NestedValue<string[]>;
  levels: NestedValue<string[]>;
}

export interface TuteeListing {
  id: number;
  tutee: Profile;
  priceMin: number;
  priceMax: number;
  description: string;
  timeSlots: number[];
  subjects: string[];
  level: Level;
  gender: Gender;
  location: Town;
  createdAt: Date;
}

export interface TuteeListingFormData {
  price: {
    lower: number;
    upper: number;
  };
  description: string;
  timeSlots: NestedValue<SelectedTimeSlots>;
  subjects: NestedValue<string[]>;
  level: Level;
  gender: Gender;
  location: Town;
}

export type SelectedTimeSlots = Record<number, boolean>;
