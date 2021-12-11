export const secToDateTime = (secs: number): string => new Date(secs * 1000).toISOString().substring(11, 16);

export const secToDate = (secs: number): string => new Date(secs * 1000).toISOString().substring(0, 10);
