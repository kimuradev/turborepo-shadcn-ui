import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';

  const numericOnly = phoneNumber.replace(/\D/g, '');

  return `(${numericOnly.slice(2, 4)}) ${numericOnly.slice(4, 9)}-${numericOnly.slice(9, 13)}`;
}

export const formatCpf = (number: string) => {
  const numericOnly = number.replace(/\D/g, '');
  if (numericOnly.length <= 3) return numericOnly;
  if (numericOnly.length <= 6) return `${numericOnly.slice(0, 3)}.${numericOnly.slice(3)}`;
  if (numericOnly.length <= 9) return `${numericOnly.slice(0, 3)}.${numericOnly.slice(3, 6)}.${numericOnly.slice(6)}`;
  return `${numericOnly.slice(0, 3)}.${numericOnly.slice(3, 6)}.${numericOnly.slice(6, 9)}-${numericOnly.slice(9, 11)}`;
}

export const getInitialLetterName = (player: string) => {
  const names = player?.split(' ');

  if (names.length <= 2) {
    return names.map(word => word.charAt(0)).join('');
  } else {
    const firstLetter = names[0]?.charAt(0);
    const lastLetter = names[names.length - 1]?.charAt(0);
    return `${firstLetter}${lastLetter}`;
  }
};

export const formattedBrazilianCurrency = (amount: string) => {
  const options = { minimumFractionDigits: 2 }
  const numberValue = parseFloat(amount) / 100;
  return isNaN(numberValue) ? '0,00' : new Intl.NumberFormat('pt-BR', options).format(numberValue);
}

export const formatCurrencyInput = (value: any) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  if (!value) return '0,00';

  const options = { minimumFractionDigits: 2 }
  const numberValue = parseFloat(value) / 100;
  const result = isNaN(numberValue) ? '0,00' : new Intl.NumberFormat('pt-BR', options).format(numberValue);

  return result;
}


export function getNameWithAbbreviation(name: string) {
  if (!name) return;

  let hasSeed = false;
  // Trim leading and trailing spaces
  const trimmedName = name.trim();

  // Split the name into words
  const nameParts = trimmedName?.split(/\s+/);

  // Identify pronouns (case-insensitive)
  const pronouns = ["do", "da", "de", "dos", "das"];

  let abbreviation = "";
  for (let i = 0; i < nameParts.length; i++) {
    const namePart: any = nameParts[i];

    // Check for special character followed by a number (indicating an ID)
    if (namePart?.match(/^\([0-9]+\)$/)) {
      abbreviation += namePart + " ";
      hasSeed = true;
    } else {
      // Skip pronouns (case-insensitive)
      if (pronouns.includes(namePart.toLowerCase())) {
        abbreviation += namePart + " ";
        continue;
      }

      if (hasSeed) {
        if (i > 1 && i < nameParts.length - 1) {
          abbreviation += namePart?.charAt(0) + ". ";
        } else {
          abbreviation += namePart + " ";
        }
      } else {
        // Abbreviate middle names (except last name)
        if (i > 0 && i < nameParts.length - 1) {
          abbreviation += namePart.charAt(0) + ". ";
        } else {
          abbreviation += namePart + " ";
        }
      }

    }
  }

  // Trim trailing space
  return abbreviation.trim();
}

