export default function toIDR(idr: number, withIDR = true): string {
  const parsed = String(idr).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${withIDR ? 'Rp' : ''}${parsed}`;
}
