export enum Gender {
  Male = 'Male',
  Female = 'Female',
  PNTS = 'Prefer not to say',
}

export interface Profile {
  id: number;
  name: string;
  gender: Gender;
  description: string;
  createdAt: Date;
}
