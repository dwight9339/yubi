export const encodeUrlParams = (params) => {
  const names = params.map((param) => param.name);
  const values = params.map((param) => param.value);

  return `?${names
    .map((name, i) => name + "=" + encodeURIComponent(values[i]))
    .join("&")}`;
};

export const decodeQueryString = (query) => {
  console.log(typeof(query));
  const paramStrings = query.split("&");
  const params = {};

  paramStrings.forEach(param => {
    const separatorIndex = param.indexOf("=");
    const key = param.substring(0, separatorIndex);
    const value = param.substring(separatorIndex + 1);
    params[key] = value;
  });

  return params;
};

export const serializeFormQuery = (query) => {
  const temp = {};

  query.forEach(param => (value, key) => {
    temp[key] = value;
  });

  return temp;
}
