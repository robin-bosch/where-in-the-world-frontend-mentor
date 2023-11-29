/**
 * Formats a number to a readable number
 * @param number - to format
 * @returns - readable number
 */
export default function formatToReadableNumber(number: number): string {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
}