/**
 * Russian Ruble and currency formatting utilities
 */

export function formatPrice(price: number): string {
  // Ensure integer value to avoid rounding issues
  const safePrice = Math.round(price);
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(safePrice) + ' ₽';
}

export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `VOLTE-${year}-${randomNum}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Normalizes phone number to digits only or formatted Russian phone
 */
export function formatPhoneNumber(val: string): string {
  const digits = val.replace(/\D/g, '');
  if (!digits) return '';

  let normalized = digits;
  if (normalized.startsWith('8') || normalized.startsWith('7')) {
    normalized = normalized.slice(1);
  }

  const parts = [];
  parts.push('+7');
  if (normalized.length > 0) {
    parts.push(' (' + normalized.slice(0, 3));
  }
  if (normalized.length >= 3) {
    parts[parts.length - 1] += ') ';
  }
  if (normalized.length > 3) {
    parts.push(normalized.slice(3, 6));
  }
  if (normalized.length >= 6) {
    parts.push('-' + normalized.slice(6, 8));
  }
  if (normalized.length >= 8) {
    parts.push('-' + normalized.slice(8, 10));
  }

  return parts.join('');
}
