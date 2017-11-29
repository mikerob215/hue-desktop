const getItem = (key: string) => localStorage.getItem(key);

const setItem = (key: string, data: string) => localStorage.setItem(key, data);

export const localstorageUtil = {
    getItem,
    setItem,
};