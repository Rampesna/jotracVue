import CryptoJS from 'crypto-js';

export const encrypt = (data: string, key: string) => {
    console.log({
        data,
        key
    });
    return CryptoJS.AES.encrypt(data, key).toString();
}

export const decrypt = (data: string | number, key: string | number) => {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
}
