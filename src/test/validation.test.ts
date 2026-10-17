import { describe, it, expect } from 'vitest';
import { validateCheckoutForm } from '../utils/validation';
import { CustomerInfo } from '../types/order';

describe('Валидация оформления заказа (Checkout Form Validation)', () => {
  const validCourierData: CustomerInfo = {
    fullName: 'Иван Петров',
    phone: '+7 (999) 123-45-67',
    email: 'ivan@example.ru',
    deliveryMethod: 'courier',
    city: 'Москва',
    address: 'ул. Тверская, д. 10',
    apartment: 'кв. 5',
  };

  it('успешно проходит валидацию при корректных данных курьерской доставки', () => {
    const result = validateCheckoutForm(validCourierData);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('отклоняет заказ, если имя пользователя слишком короткое или пустое', () => {
    const invalid = { ...validCourierData, fullName: ' ' };
    const result = validateCheckoutForm(invalid);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
  });

  it('проверяет номер телефона на достаточное количество цифр', () => {
    const invalidPhone = { ...validCourierData, phone: '+7 (999) 12' };
    const result = validateCheckoutForm(invalidPhone);
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it('проверяет формат адреса электронной почты', () => {
    const invalidEmail = { ...validCourierData, email: 'not-an-email' };
    const result = validateCheckoutForm(invalidEmail);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it('не требует адрес улицы и города при выборе самовывоза', () => {
    const pickupData: CustomerInfo = {
      fullName: 'Ольга Соколова',
      phone: '+7 (916) 555-44-33',
      email: 'olga@volte.ru',
      deliveryMethod: 'pickup',
      city: '',
      address: '',
    };

    const result = validateCheckoutForm(pickupData);
    expect(result.isValid).toBe(true);
    expect(result.errors.address).toBeUndefined();
    expect(result.errors.city).toBeUndefined();
  });

  it('требует адрес при выборе экспресс-доставки', () => {
    const expressWithoutAddress: CustomerInfo = {
      fullName: 'Ольга Соколова',
      phone: '+7 (916) 555-44-33',
      email: 'olga@volte.ru',
      deliveryMethod: 'express',
      city: 'Москва',
      address: '',
    };

    const result = validateCheckoutForm(expressWithoutAddress);
    expect(result.isValid).toBe(false);
    expect(result.errors.address).toBeDefined();
  });
});
