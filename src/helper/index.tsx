/**
 * Format a number with comma separators, peso symbol, and two decimal places.
 *
 * @format
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted string.
 */

export const formatCurrency = (amount: number): string => {
  if (isNaN(amount)) {
    throw new Error("Invalid amount");
  }

  // Convert the number to a fixed-point notation with two decimal places
  const fixedAmount = amount.toFixed(2);

  // Use regex to add comma separators
  const parts = fixedAmount.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted string with peso symbol and `.00`
  return `₱${integerWithCommas}.${decimalPart}`;
};

export /**
 * Format a number into a more readable form with suffixes like 'k', 'M', 'B', etc.
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted string.
 */
function formatShortCurrency(amount: number) {
  if (isNaN(amount)) {
    throw new Error("Invalid amount");
  }

  const absAmount = Math.abs(amount);

  if (absAmount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}B`;
  } else if (absAmount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  } else if (absAmount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}k`;
  } else {
    return amount.toString();
  }
}

// colorTheme.js
export const colorTheme = {
  primary: {
    light: "#F5E8DD", // Light variant of primary color
    main: "#e4c0a2", // Primary color (e.g., for buttons, headers)
    dark: "#c4e0e5", // Dark variant of primary color
  },
  secondary: {
    light: "#e4c0a2", // Light variant of secondary color
    main: "#f50057", // Secondary color (e.g., for accent elements)
    dark: "#c51162", // Dark variant of secondary color
  },
  background: {
    default: "#f5f5f5", // Default background color
    paper: "#ffffff", // Background for elements like cards
  },
  text: {
    primary: "#212121", // Primary text color
    secondary: "#757575", // Secondary text color
    disabled: "#9e9e9e", // Disabled text color
  },
  success: {
    main: "#4caf50", // Color for success messages or icons
    light: "#73BBA3",
    contrastText: "#ffffff", // Text color to use on success background
  },
  warning: {
    main: "#ff9800", // Color for warnings
    contrastText: "#ffffff", // Text color to use on warning background
  },
  error: {
    main: "#f44336", // Color for errors
    light: "#FF7777",
    contrastText: "#ffffff", // Text color to use on error background
  },
  info: {
    main: "#2196f3", // Color for informational messages
    contrastText: "#ffffff", // Text color to use on info background
  },
  grey: {
    light: "#eeeeee", // Light grey (e.g., for borders)
    main: "#9e9e9e", // Main grey color
    dark: "#616161", // Dark grey
  },
};
