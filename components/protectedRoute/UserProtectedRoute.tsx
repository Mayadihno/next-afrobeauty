"use client";

import { ReactNode, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { setUserSessionToken } from "@/redux/slice/userSlice";
import Spinner from "../spinner/Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UserProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isUserAuthenticated, userSessionToken, isLoading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");

    if (token) {
      dispatch(setUserSessionToken(token));
    } else if (!isUserAuthenticated && !userSessionToken) {
      router.push("/login");
    }
  }, [isUserAuthenticated, userSessionToken, router, dispatch]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return isUserAuthenticated && userSessionToken ? <>{children}</> : null;
};

export default UserProtectedRoute;
