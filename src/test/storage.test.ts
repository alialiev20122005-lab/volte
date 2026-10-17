import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../services/storage';

describe('Сервис локального хранения (Storage Service)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('сохраняет и извлекает типизированные объекты', () => {
    const testData = { name: 'VOLTE Test', counter: 42 };
    storage.set('test_key', testData);

    const retrieved = storage.get('test_key', null);
    expect(retrieved).toEqual(testData);
  });

  it('возвращает defaultValue, если ключ не существует', () => {
    const fallback = { status: 'empty' };
    const retrieved = storage.get('non_existent_key', fallback);
    expect(retrieved).toEqual(fallback);
  });

  it('безопасно обрабатывает поврежденный JSON в localStorage без выброса исключений', () => {
    window.localStorage.setItem('corrupt_key', '{ invalid json:');
    const fallback = ['safe_fallback'];

    const retrieved = storage.get('corrupt_key', fallback);
    expect(retrieved).toEqual(fallback);
  });

  it('удаляет ключ из хранилища', () => {
    storage.set('to_remove', 'value');
    expect(storage.get('to_remove', null)).toBe('value');

    storage.remove('to_remove');
    expect(storage.get('to_remove', null)).toBeNull();
  });
});
