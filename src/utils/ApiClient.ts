import type { Response } from "../types/api.type.ts";

interface Body {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default class ApiClient{
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<Type>(endpoint: string):Promise<Response<Type>> {
        const response = await this.#send<Type>(endpoint, 'GET');
        return response; 
    }

    async #send<Type>(endpoint: string, method: string, body?:Body, token?: string): Promise<Response<Type>> {

        interface Options {
            method: string;
            headers: {
                "Content-Type": string;
                "R-Auth"?: string;
            };
            body?: string; 
        }

        const options: Options = {
            method,
            headers: {
                "Content-Type": "application/json",
            }, 
        }

        if(body) {
            options.body = JSON.stringify(body);
        }

        if(token) {
            options.headers['R-Auth'] = `${token}`;
        }

        try{
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            
            if(!response.ok) {
                throw new Error(`Fetch error: ${response}`);
            } else {
                const data = await response.json();
                return {response: response.statusText, data: data};
            }
        } catch(error) {
            console.error('Error occured while fetching: ', error);
            throw error;
        }
    }
}