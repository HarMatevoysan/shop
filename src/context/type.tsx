export interface IAuthContext {
  isAuth: boolean | null;
  setIsAuth: (value: boolean) => void | null;

  isAdmin: boolean | null;
  setIsAdmin: (value: boolean) => void | null;
}

export interface IAdminContext {}
