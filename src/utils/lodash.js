import map from 'lodash/map';
import zipObject from 'lodash/zipObject';

export function mappedAttributeArr (arr, attr) {
  return map(arr, (i) => { return i[ attr ] });
}

export function mappedObj (arr, key, val) {
  return zipObject(mappedAttributeArr(arr, key), mappedAttributeArr(arr, val));
}
