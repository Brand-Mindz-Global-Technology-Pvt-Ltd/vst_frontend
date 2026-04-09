export interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    oldPrice?: number;
    discount?: string;
    images: string[];
    description: string;
    brand?: string;
    category: string;
    subCategory: string;
    stock: number;
    rating: number;
    reviewsCount?: number;
    isLimitedTime?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductListResponse {
    success: boolean;
    data: Product[];
    pagination: {
        total: number;
        page: number;
        totalPages: number;
        limit: number;
    };
}
