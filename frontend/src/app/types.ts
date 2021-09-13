export enum Gender {
  M = 'Male',
  F = 'Female',
  N = 'None',
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
  Monday = 'Mon',
  Tuesday = 'Tue',
  Wednesday = 'Wed',
  Thursday = 'Thu',
  Friday = 'Fri',
  Saturday = 'Sat',
  Sunday = 'Sun',
}

export interface Profile {
  id: number;
  name: string;
  description: string;
  gender: Gender;
  createdAt: Date;
}

export interface TutorListing {
  id: number;
  tutor: Profile;
  priceMin: number;
  priceMax: number;
  description: string;
  timeSlots: number[];
  subjects: string[];
  levels: string[];
  createdAt: Date;
}

export interface TuteeListing {
  id: number;
  tutee: Profile;
  priceMin: number;
  priceMax: number;
  description: string;
  timeSlots: number[];
  subjects: string[];
  level: string;
  gender: Gender;
  location: Town;
  createdAt: Date;
}
