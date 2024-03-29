import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

export const customAxios = async (
    method: 'POST' | 'GET' | 'DELETE' | 'PUT',
    url: string,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
    options?: {
        data?: any;
        actionOnSuccess?: (data: any) => void;
        actionOnFailure?: (error: any) => void;
        loadingString?: string;
        successString?: string;
    }
) => {
    const getAxiosInstance = () => {
        let axiosMethod: any;
        url = '/api/' + url;

        setFetching(true);

        switch (method) {
            case 'POST':
                axiosMethod = axios.post(url, options?.data);
                break;
            case 'GET':
                axiosMethod = axios.get(url);
                break;
            case 'DELETE':
                axiosMethod = axios.delete(url, options?.data);
                break;
            case 'PUT':
                axiosMethod = axios.put(url, options?.data);
                break;
            default:
                axiosMethod = axios.post(url, options?.data);
                break;
        }

        return axiosMethod
            .then((res: any) => {
                setFetching(false);

                if (res.status === 200) {
                    if (options?.actionOnSuccess) {
                        options.actionOnSuccess(res.data);
                    }
                    return Promise.resolve();
                } else {
                    if (options?.actionOnFailure) {
                        options.actionOnFailure(res.data);
                    }
                    return Promise.reject('Something went wrong!');
                }
            })
            .catch((err: any) => {
                setFetching(false);

                if (options?.actionOnFailure) {
                    options.actionOnFailure(err);
                }

                return Promise.reject(err.response.data.error);
            });
    };

    const promise = getAxiosInstance();

    if (!options?.loadingString && !options?.successString) return;

    await toast.promise(promise, {
        loading: options?.loadingString ? options.loadingString : 'Loading...',
        success: options?.successString ? options.successString : 'Success!',
        error: (err) => `${err}`
    });
};
