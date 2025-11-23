import ApiClient from "../utils/ApiClient.ts";
import type { ProductType } from "../types/product.type.ts";
import type { Response } from "../types/api.type.ts";

const api = new ApiClient('https://fakestoreapi.com/');
export const getProducts = async (): Promise<Response<ProductType[]>> => {
    const data = api.get<ProductType[]>('products');
    return data;
}