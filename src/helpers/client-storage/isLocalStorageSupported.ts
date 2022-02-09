export default function isLocalStorageSupported(): boolean {
  try {
    window.localStorage.setItem('can', 'true');
    const can = window.localStorage.getItem('can');
    if (can !== 'true') {
      return false;
    }
    window.localStorage.removeItem('can');
    return true;
  } catch (error) {
    return false;
  }
}
