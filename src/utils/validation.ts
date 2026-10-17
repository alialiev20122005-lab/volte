import { CustomerInfo, DeliveryOption } from '../types/order';

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'courier',
    name: 'Курьерская доставка VOLTÉ',
    price: 590,
    estimatedTime: '1–2 рабочих дня',
    description: 'Бережная доставка собственной премиальной службой до двери с примеркой и проверкой устройства.',
  },
  {
    id: 'express',
    name: 'Экспресс-доставка за 3 часа',
    price: 1490,
    estimatedTime: 'Сегодня в течение 3 часов',
    description: 'Срочная доставка персональным курьером в день заказа по вашему адресу.',
  },
  {
    id: 'pickup',
    name: 'Самовывоз из флагманского бутика',
    price: 0,
    estimatedTime: 'Готов к выдаче через 1 час',
    description: 'Москва, Театральный проезд, д. 2 (демонстрационная точка выдачи VOLTÉ Experience).',
  },
];

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
}

export function validateCheckoutForm(data: CustomerInfo): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Full Name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Пожалуйста, укажите имя и фамилию (минимум 2 символа)';
  }

  // Phone validation (expects at least 10 digits after country code)
  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  if (!phoneDigits) {
    errors.phone = 'Укажите номер телефона для подтверждения';
  } else if (phoneDigits.length < 11) {
    errors.phone = 'Введите корректный номер телефона (11 цифр)';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Укажите адрес электронной почты';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Некорректный формат email (пример: client@volte.ru)';
  }

  // Address validation (required for courier and express)
  if (data.deliveryMethod !== 'pickup') {
    if (!data.city || data.city.trim().length < 2) {
      errors.city = 'Укажите город доставки';
    }
    if (!data.address || data.address.trim().length < 5) {
      errors.address = 'Укажите улицу, дом и номер квартиры/офиса';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
