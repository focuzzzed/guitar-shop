
export const transformToQueryString = (queries: Record<string, unknown>) => Object.entries(queries)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((element) => `${encodeURIComponent(key)}[]=${encodeURIComponent(String(element))}`).join('&');
    } else if (value) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    }
    return '';
  })
  .filter(Boolean)
  .join('&');
