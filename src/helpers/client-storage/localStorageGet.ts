import type { Stored } from './types';

interface Options {
  key: string;
}

export default function localStorageGet<T = any>({ key }: Options): T | null {
  const stored = String(window.localStorage.getItem(key));
  let parsed: Stored | null | undefined;
  let value: number | string | null | undefined | any;

  if (stored === 'undefined') {
    // JSON.parse can't parse string `undefined`, so we just directly set the value, which is `null`. Legacy `dom/LocalStorage` module expects `null`, not `undefined`.
    value = null;
  } else {
    try {
      parsed = JSON.parse(stored);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }

      // Set to null to be backward-compatible with legacy `dom/LocalStorage` module.
      parsed = null;
    }

    if (typeof parsed === 'undefined' || parsed === null) {
      // If parsed value is `undefined`, legacy `dom/LocalStorage` module expects `null`, not `undefined`.
      value = null;
    } else if (typeof parsed === 'object' && parsed?.b >= 2) {
      // This means the stored value is new format (using `v` for value and `e` for expiredAt).
      value = parsed.v;
    } else {
      // This means stored value is legacy format (not using `v` for value and `e` for expiredAt).
      value = parsed;
    }
  }

  const expireValue = parsed?.e;
  let expiredAt: number;

  if (typeof expireValue === 'number') {
    expiredAt = expireValue;
  } else {
    // If expireValue is `null` or `undefined`, it means the stored value never expires, so we use Infinity
    // Note: `expireValue` as string cannot happen because `storage/set` parse it into integer.
    expiredAt = Infinity;
  }

  if (expiredAt <= Date.now()) {
    window.localStorage.removeItem(key);
    return null;
  }

  return value;
}
