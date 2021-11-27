export const toDateTime = (secs: number): string => new Date(secs * 1000).toISOString().substring(11, 16);
