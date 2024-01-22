export interface IAccount {
  modules: string[];
  id?: number | null;
  userName: string;
  firstName: string;
  lastName: string;
  locale: string;
  direction: string;
  status: string;
  fullName: string;
}
