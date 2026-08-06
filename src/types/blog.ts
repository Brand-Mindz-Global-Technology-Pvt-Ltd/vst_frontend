export interface BlogSection {
    type: 'intro' | 'heading' | 'paragraph' | 'features' | 'conclusion' | 'cta';
    heading?: string;
    content?: string;
    featureLabel?: string;
    items?: Array<{ text: string }>;
}

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    author: { name: string; avatar?: string };
    tags: string[];
    sections: BlogSection[];
    readTime: string;
    comments: number;
    isFeatured: boolean;
    status: 'draft' | 'published';
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface BlogListResponse {
    success: boolean;
    data: Blog[];
    pagination: { page: number; limit: number; total: number; pages: number };
}
