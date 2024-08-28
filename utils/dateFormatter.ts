import { parseISO } from "date-fns";

export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "Invalid date";
  }

  const date = parseISO(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
