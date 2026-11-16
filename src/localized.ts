export type Localized = string | { fr?: string; es?: string };

export function textOf(value: Localized | undefined, language: string): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return language.startsWith('es') ? (value.es || value.fr || '') : (value.fr || value.es || '');
}

export function storageIsLocalized(items: unknown): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const title = (item as { title?: unknown }).title;
    return !!title && typeof title === 'object';
  });
}
