export const serializeAxiosError = error => {
  return JSON.parse(error?.response?.data || {});
};
