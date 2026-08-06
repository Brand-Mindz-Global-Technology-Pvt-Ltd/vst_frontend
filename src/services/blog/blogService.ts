import api from '../api';
import type { Blog, BlogListResponse } from '../../types/blog';

export const getPublishedBlogs = async (params: { limit?: number; page?: number; featured?: boolean; tag?: string } = {}) => {
    const response = await api.get<BlogListResponse>('/blogs', { params });
    return response.data;
};

export const getPublishedBlog = async (slug: string) => {
    const response = await api.get<{ success: boolean; data: Blog }>(`/blogs/${encodeURIComponent(slug)}`);
    return response.data.data;
};
