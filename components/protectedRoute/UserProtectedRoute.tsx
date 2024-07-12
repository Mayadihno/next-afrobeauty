"use client";

import { ReactNode, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { setSessionToken } from "@/redux/slice/userSlice";
import Spinner from "../spinner/Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UserProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, sessionToken, isLoading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");

    if (token) {
      dispatch(setSessionToken(token));
    } else if (!isAuthenticated && !sessionToken) {
      router.push("/login");
    }
  }, [isAuthenticated, sessionToken, router, dispatch]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return isAuthenticated && sessionToken ? <>{children}</> : null;
};

export default UserProtectedRoute;
