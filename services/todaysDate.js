export default function todaysDate() {
  // Push a new week
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  // Convert to dates
  return today.toISOString();
}
