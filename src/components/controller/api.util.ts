import type { Article, NewsResponse, Source, SourcesResponse } from './api.type';

function isRecord(data: unknown): data is Record<string, unknown> {
    return typeof data === 'object' && data !== null && !Array.isArray(data);
}

function isSource(data: unknown): data is Source {
    return (
        isRecord(data) &&
        typeof data.id === 'string' &&
        typeof data.name === 'string' &&
        typeof data.description === 'string' &&
        typeof data.url === 'string' &&
        typeof data.category === 'string' &&
        typeof data.language === 'string' &&
        typeof data.country === 'string'
    );
}

function isArticle(data: unknown): data is Article {
    return (
        isRecord(data) &&
        isRecord(data.source) &&
        (typeof data.source.id === 'string' || data.source.id === null) &&
        typeof data.source.name === 'string' &&
        (typeof data.author === 'string' || data.author === null) &&
        typeof data.title === 'string' &&
        (typeof data.description === 'string' || data.description === null) &&
        typeof data.url === 'string' &&
        (typeof data.urlToImage === 'string' || data.urlToImage === null) &&
        typeof data.publishedAt === 'string' &&
        (typeof data.content === 'string' || data.content === null)
    );
}

function isArrayOf<T>(data: unknown, isItem: (item: unknown) => item is T): data is T[] {
    return Array.isArray(data) && data.every(isItem);
}

export function isSourcesResponse(data: unknown): data is SourcesResponse {
    return isRecord(data) && data.status === 'ok' && isArrayOf(data.sources, isSource);
}

export function isNewsResponse(data: unknown): data is NewsResponse {
    return (
        isRecord(data) &&
        data.status === 'ok' &&
        typeof data.totalResults === 'number' &&
        isArrayOf(data.articles, isArticle)
    );
}
