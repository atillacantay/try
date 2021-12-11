const cloneAsObject = (obj: any) => {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }
  var temp: any = obj instanceof Array ? [] : {};
  // ReSharper disable once MissingHasOwnPropertyInForeach
  for (var key in obj) {
    temp[key] = cloneAsObject(obj[key]);
  }
  return temp;
};

export const convertToObject = (obj: any) => cloneAsObject(obj);
