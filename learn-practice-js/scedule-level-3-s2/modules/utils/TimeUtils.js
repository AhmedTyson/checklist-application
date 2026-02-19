/**
 * Utility functions for time manipulation and schedule logic.
 */
export class TimeUtils {
  /**
   * Converts a 12-hour time string (e.g., "10:00 AM") to minutes from midnight.
   * @param {string} timeStr - The time string to parse.
   * @returns {number} Minutes from midnight.
   */
  static timeToMinutes(timeStr) {
    if (!timeStr) return -1;
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (hours === 12) hours = 0;
    if (modifier === "PM") hours += 12;

    return hours * 60 + minutes;
  }

  /**
   * Gets the current time in minutes from midnight.
   * @param {Date} date - Optional date to use as "now".
   * @returns {number} Current minutes from midnight.
   */
  static getCurrentMinutes(date = new Date()) {
    const now = date;
    return now.getHours() * 60 + now.getMinutes();
  }

  /**
   * Gets the current day name in English (e.g., "Monday").
   * @param {Date} date - Optional date to use as "today".
   * @returns {string} The current day name.
   */
  static getCurrentDay(date = new Date()) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  /**
   * Calculates the progress percentage of a current event.
   * @param {string} startStr - Start time (e.g., "10:00 AM").
   * @param {string} endStr - End time (e.g., "11:00 AM").
   * @param {Date} date - Optional date.
   * @returns {number} Percentage (0-100).
   */
  static getProgress(startStr, endStr, date = new Date()) {
    const start = this.timeToMinutes(startStr);
    const end = this.timeToMinutes(endStr);
    const now = this.getCurrentMinutes(date);

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const elapsed = now - start;

    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  }

  /**
   * Determines the status of a class relative to the current time.
   * @param {string} startStr - Start time.
   * @param {string} endStr - End time.
   * @param {number} upcomingWindow - Minutes to look ahead.
   * @param {Date} date - Optional date.
   * @returns {'ACTIVE' | 'UPCOMING' | 'FINISHED' | 'FUTURE'} Status.
   */
  static getClassStatus(
    startStr,
    endStr,
    upcomingWindow = 15,
    date = new Date(),
  ) {
    const start = this.timeToMinutes(startStr);
    const end = this.timeToMinutes(endStr);
    const now = this.getCurrentMinutes(date);

    if (now >= start && now < end) return "ACTIVE";
    if (now < start && start - now <= upcomingWindow) return "UPCOMING";
    if (now >= end) return "FINISHED";
    return "FUTURE";
  }
}
