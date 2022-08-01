import localStore from 'store2';
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import JSURL from 'jsurl';
import Cookie from "js-cookie"


export const sendNotification = ({ type, message, duration }) => {
    const options = {
        progress: 0,
        autoClose: duration || 3000
    };

    if (type === 'error') {
        toast.error(message, options);
    } else if (type === 'default') {
        toast(message, options);
    } else if (type === 'warning') {
        toast.warning(message, options);
    } else if (type === 'success') {
        toast.success(message, options);
    }
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

export const setLocalStorageItems = ({ set = false, setAll = false, item = null, items = {} }) => {
    if (set) {
        const { key, value } = item;
        localStore.set(key, value);
    } else if (setAll) {
        localStore.setAll(items);
    }
}

export const getLocalStorageItems = ({ get = false, getAll = false, key = null, keys = {} }) => {
    if (get) {
        const value = localStore.get(key);
        return { [key]: value };
    } else if (getAll) {
        return localStore.getAll(keys);
    }
    return null;
}

export const getAllRequiredHeaders = () => {
    const token = Cookie.get("token") || "undefined";
    const user_id = Cookie.get("id") || "undefined";
    return {
        "Authorization": token,
        "X-Authorization": user_id
    };
}

export const getValidString = (str) => {
    let latestStr = str.split('"');
    return latestStr[1];
}

export const handleImageUpload = (e, id) => {
    return new Promise((resolve, reject) => {
        var selectedImage = document.getElementById(`${id}`).files;
        if (selectedImage.length > 0) {
            var fileToLoad = selectedImage[0];
            var fileReader = new FileReader();

            fileReader.onload = function (e) {
                var srcData = e.target.result;
                resolve(srcData);
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    })
};

export const useQueryParam = (key) => {
    let [searchParams, setSearchParams] = useSearchParams();
    let paramValue = searchParams.get(key);

    let value = useMemo(() => JSURL.parse(JSURL.stringify(paramValue)), [paramValue]);

    let setValue = useCallback(
        (newValue) => {
            let newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(key, JSURL.stringify(newValue));
            setSearchParams(newSearchParams);
        },
        [key, searchParams, setSearchParams]
    );

    return [value, setValue];
}