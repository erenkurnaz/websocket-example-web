import create from 'zustand';

export const USER_STORAGE_KEY = 'user';

export interface User {
  _id: string;
  name: string;
  email: string;
  surname: string;
}

export interface AuthUser {
  token: string;
  user: User;
}

export interface AuthStore {
  authUser: AuthUser | null;
  loading: boolean;
  initialize: () => AuthUser | null;
  setUser: (authUser: AuthUser) => void;
  deleteUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loading: true,
  authUser: null,
  initialize: () => {
    const user = sessionStorage.getItem(USER_STORAGE_KEY);
    const parsedAuthUser: AuthUser | null = user ? JSON.parse(user) : null;

    set({
      loading: false,
      authUser: parsedAuthUser,
    });

    return parsedAuthUser;
  },
  setUser: (authUser: AuthUser) => {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
    set(() => ({ authUser }));
  },
  deleteUser: () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
    set(() => ({ authUser: null }));
  },
}));
