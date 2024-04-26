"use client"

import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_ADMIN } from "@tennis/lib/constants";
import { type ProfileProps } from "@tennis/lib/definitions";

type AuthProviderProps = {
  children?: React.ReactNode;
}

type Nullable<T> = T | null;

interface AuthContext {
  user?: Nullable<string>;
  signed: boolean,
  isAdmin: boolean,
  login: (data: any) => void,
  logout: () => void,
  profile: ProfileProps,
  setProfile: Dispatch<SetStateAction<ProfileProps>>
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [profile, setProfile] = useState({})
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter();

  const login = (data: any) => {
    setUser(data.user);
    setIsAdmin(hasAdminRole(data.roles))

    if (!data.name && !hasAdminRole(data.roles)) {
      router.push(`/users/${data.id}`)
    }

    return;
  };

  const logout = () => {
    setUser(null);
    setProfile({})
    router.push('/')
  };

  const hasAdminRole = (roles: []) => roles.some(role => role === ROLE_ADMIN)

  const value = useMemo(
    () => ({
      user,
      signed: !!user,
      isAdmin,
      login,
      logout,
      profile,
      setProfile
    }),
    [user, profile]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used with AuthContext')
  }

  return context;
};

