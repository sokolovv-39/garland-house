const oneDayInMs = 24 * 60 * 60 * 1000;

export function isLocalAuth(lastLogin: string) {
  return Date.now() - +lastLogin < oneDayInMs;
}
