export const getEnv = (key: string, defaultValue?:string)=>{
    if (key !== undefined) {
        const value = import.meta.env[key] || defaultValue;
        return value
    }
    throw new Error(`Missing env variable key ${key}`);
}

export const HOST = getEnv("VITE_BASE_URL");

export const PRODUCTS_ITEM = "/products";

export const CATEGORY_LIST = `${PRODUCTS_ITEM}/category-list`;

export const PROCUCT_CATEGORY = `${PRODUCTS_ITEM}/category`;

export const SEARCH_ITEM = `${PRODUCTS_ITEM}/search`

