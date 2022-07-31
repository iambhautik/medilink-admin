import localStore from 'store2';
import { toast } from "react-toastify";

export const getAllRequiredHeaders = () => {
  const token = localStore.get("token") || "undefined";
  const user_id = localStore.get("uid") || "undefined";
  return {
      "Authorization": token,
      "X-Authorization": user_id
  };
}

export const isValidArray = (arr) => {
  return arr && Array.isArray(arr) && arr.length > 0;
}

export const isValidObject = (obj, keys) => {
  if (isValidArray(keys)) {
      const newObjKeys = isValidObject(obj, []) ? Object.keys(obj) : [];

      if (!isValidArray(newObjKeys)) {
          return false;
      }

      let isValid = keys.length;
      keys.forEach(key => {
          if (newObjKeys.includes(key)) {
              isValid -= 1;
          }
      });
      return isValid === 0;
  }
  return obj && Object.keys(obj).length > 0;
}
