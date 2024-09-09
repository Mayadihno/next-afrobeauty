"use client";
export const getItem = async (key: string): Promise<string | undefined> => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : "";
    } catch (error) {
      console.error("Failed to parse session token from localStorage", error);
    }
  }
};
