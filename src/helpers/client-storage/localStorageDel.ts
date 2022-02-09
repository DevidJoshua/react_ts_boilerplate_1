import isLocalStorageSupported from './isLocalStorageSupported';
import Cookies from 'universal-cookie';

export default function del(key: string): void {
  if (isLocalStorageSupported()) {
    window.localStorage.removeItem(key);
  } else {
    const cookies = new Cookies();
    cookies.remove(key);
  }
}
