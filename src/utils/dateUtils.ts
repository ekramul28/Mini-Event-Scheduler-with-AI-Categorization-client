import {
  format,
  parseISO,
  isValid,
  isToday,
  isTomorrow,
  isYesterday,
  addDays,
  startOfDay,
  endOfDay,
} from "date-fns";

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "Invalid Date";

    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "EEE, MMM d, yyyy");
    }
  } catch {
    return "Invalid Date";
  }
};

/**
 * Format a time string to 12-hour format
 */
export const formatTime = (timeString: string | undefined): string => {
  if (!timeString) return "N/A";

  try {
    // Create a date object with today's date and the time string
    const today = new Date();
    const [hours, minutes] = timeString.split(":");
    const dateWithTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    );

    if (!isValid(dateWithTime)) return "Invalid Time";
    return format(dateWithTime, "h:mm a");
  } catch {
    return "Invalid Time";
  }
};

/**
 * Format date and time together
 */
export const formatDateTime = (
  dateString: string | undefined,
  timeString: string | undefined
): string => {
  const date = formatDate(dateString);
  const time = formatTime(timeString);

  if (date === "N/A" || time === "N/A") return "N/A";
  return `${date} at ${time}`;
};

/**
 * Get relative time description (e.g., "in 2 days", "yesterday")
 */
export const getRelativeTime = (
  dateString: string | undefined,
  timeString: string | undefined
): string => {
  if (!dateString || !timeString) return "N/A";

  try {
    const dateTime = parseISO(`${dateString}T${timeString}`);
    if (!isValid(dateTime)) return "Invalid Date";

    const now = new Date();
    const diffInDays = Math.floor(
      (dateTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Tomorrow";
    } else if (diffInDays === -1) {
      return "Yesterday";
    } else if (diffInDays > 0) {
      return `in ${diffInDays} days`;
    } else {
      return `${Math.abs(diffInDays)} days ago`;
    }
  } catch {
    return "N/A";
  }
};

/**
 * Check if a date is in the past
 */
export const isPast = (
  dateString: string | undefined,
  timeString: string | undefined
): boolean => {
  if (!dateString || !timeString) return false;

  try {
    const dateTime = parseISO(`${dateString}T${timeString}`);
    if (!isValid(dateTime)) return false;

    return dateTime < new Date();
  } catch {
    return false;
  }
};

/**
 * Get the start and end of a day
 */
export const getDayBounds = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return null;

    return {
      start: startOfDay(date),
      end: endOfDay(date),
    };
  } catch {
    return null;
  }
};

/**
 * Add days to a date string
 */
export const addDaysToDate = (dateString: string, days: number): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;

    const newDate = addDays(date, days);
    return format(newDate, "yyyy-MM-dd");
  } catch {
    return dateString;
  }
};
