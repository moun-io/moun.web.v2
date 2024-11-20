export function isValidUrl(string: any) {
  try {
    new URL(string);
    return true; // No error means it's a valid URL
  } catch (error) {
    return false; // Error means it's not a valid URL
  }
}

export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
export function isValidTime(timeString: string): boolean {
  const regex = /^\d{2}:\d{2}$/;
  return regex.test(timeString);
}
