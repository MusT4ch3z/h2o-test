export interface IUserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IColumn<T> {
  colSpan?: number;
  title: string;
  isCollapsed?: boolean;
  render?: (data: T) => string | JSX.Element | number;
  children?: IColumn<T>[];
}

export interface ITableCellProps {
  cellPath: (data: IUserData) => string | number | JSX.Element;
  data: any;
  userInfo: IUserData;
}
