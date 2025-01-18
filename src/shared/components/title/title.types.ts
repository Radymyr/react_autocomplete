import { Person } from '../../../types/Person';

export type TitleProps = {
  currentPerson: Person | null;
  name?: string;
  born?: number;
  died?: number;
};
