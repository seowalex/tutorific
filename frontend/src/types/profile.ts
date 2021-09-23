export interface Profile {
  id: number;
  name: string;
  gender: Gender;
  description: string;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  PNTS = 'Prefer not to say',
}
