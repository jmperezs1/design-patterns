import type { User } from './interfaces/user';

export interface Target {
  request(): Promise<User[]>;
}
