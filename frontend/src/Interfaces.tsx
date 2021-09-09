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

export interface TutorListingDetails {
  tutor_id: number;
  subjects: [string];
  levels: [string];
  price_min: number;
  price_max: number;
  time_slots: [number];
  description: string;
}

export interface TutorListing {
  id: number;
  details: TutorListingDetails;
}

export interface TuteeListingDetails {
  tutor_id: number;
  subjects: [string];
  levels: [string];
  price_min: number;
  price_max: number;
  time_slots: [number];
  description: string;
  gender: Gender;
  location: Town;
}

export interface TuteeListing {
  id: number;
  details: TuteeListingDetails;
}
