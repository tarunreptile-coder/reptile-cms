import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '~/../config.json';

type IHttpApi = Reptile.Service.IHttpApi;

export default class AxiosHttp implements IHttpApi {
    private readonly _instance: AxiosInstance;

    constructor() {
        this._instance = axios.create({
            baseURL: "https://admin.onreptile.com/api",
            timeout: 40000,
        });
    }

    async get<TConfig, TResponse>(url: string, config?: TConfig | undefined): Promise<TResponse> {
        return (await this._instance.get(url, config as AxiosRequestConfig)).data as TResponse;
    }

    async post<TConfig, TData, TResponse>(url: string, data: TData, config?: TConfig | undefined): Promise<TResponse> {
        return (await this._instance.post(url, data, config as AxiosRequestConfig)).data as TResponse;
    }

    async put<TConfig, TData, TResponse>(url: string, data: TData, config?: TConfig | undefined): Promise<TResponse> {
        return (await this._instance.put(url, data, config as AxiosRequestConfig)).data as TResponse;
    }

    async patch<TConfig, TData, TResponse>(url: string, data: TData, config?: TConfig | undefined): Promise<TResponse> {
        return (await this._instance.patch(url, data, config as AxiosRequestConfig)).data as TResponse;
    }

    async delete<TConfig, TResponse>(url: string, config?: TConfig | undefined): Promise<TResponse> {
        return (await this._instance.delete(url, config as AxiosRequestConfig)).data as TResponse;
    }
}
