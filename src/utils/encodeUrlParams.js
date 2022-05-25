export const encodeUrlParams = (params) => {
  const names = params.map((param) => param.name);
  const values = params.map((param) => param.value);

  return `?${names
    .map((name, i) => name + "=" + encodeURIComponent(values[i]))
    .join("&")}`;
};
