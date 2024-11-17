import { format, parseISO } from "date-fns";

export const formatDate = (dateString) => {
  try {
    if (!dateString) return "";
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;
    return format(date, "MMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  try {
    if (!dateString) return "";
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;
    return format(date, "MMM dd, yyyy HH:mm");
  } catch (error) {
    console.error("Error formatting datetime:", error);
    return dateString;
  }
};

export const formatTime = (dateString) => {
  try {
    if (!dateString) return "";
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;
    return format(date, "HH:mm");
  } catch (error) {
    console.error("Error formatting time:", error);
    return dateString;
  }
};
