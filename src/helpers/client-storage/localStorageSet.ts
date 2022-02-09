import type { ExpiredAt, Stored } from './types';

interface Options {
  key: string;
  value: any;
  expiredAt?: ExpiredAt;
}

export default function localStorageSet({ key, value, expiredAt }: Options): void {
  let expiryValue;

  if (expiredAt instanceof Date) {
    expiryValue = expiredAt.valueOf();
  } else if (typeof expiredAt === 'string') {
    expiryValue = parseInt(expiredAt, 10);
    if (String(expiryValue) !== expiredAt) {
      throw new Error(`Err code: CST_EXP_1. expiredAt: ${expiredAt}`);
    }
  } else {
    expiryValue = expiredAt;
  }

  const stored: Stored = {
    v: value,
    e: expiryValue,
    // Storage module build version.
    b: 2,
  };

  const stringified = JSON.stringify(stored);

  localStorage.setItem(key, stringified);
}
