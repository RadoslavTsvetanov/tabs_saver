/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

interface Result {
  data: any;
  status: number;
  err: string | undefined;
}

interface RequestOptions {
  method: 'GET' | 'POST';
  endpoint: string;
  data?: any;
  headers?: any;
}

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private static buildResponse(data: any, status: number, err: string | undefined): Result {
        return {
            data: data,
            status: status,
            err: err
        };
    }

    private async axiosRequest(options: RequestOptions): Promise<Result> {
        try {
            const config = {
                method: options.method,
                url: `${this.baseUrl}/${options.endpoint}`,
                data: options.method === 'POST' ? options.data : undefined,
                params: options.method === 'GET' ? options.data : undefined,
                headers: options.headers,
            };

            const response = await axios(config);
            return ApiClient.buildResponse(response.data, response.status, undefined);
        } catch (error: any) {
            console.error('Request error:', error);
            return ApiClient.buildResponse({}, error.response ? error.response.status : 500, error.message);
        }
    }

    async getRequest(endpoint: string, reqData: object, headers?: any): Promise<Result> {
        return await  this.axiosRequest({ method: 'GET', endpoint, data: reqData, headers });
    }
    async postRequest(endpoint: string, reqData: object, headers?: any): Promise<Result> {
        return await this.axiosRequest({ method: 'POST', endpoint, data: reqData, headers });
    }
}