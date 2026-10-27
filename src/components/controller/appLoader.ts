import type { Article, Source } from './api.type';
import { isNewsResponse, isSourcesResponse } from './api.util';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (apiUrl === undefined || apiKey === undefined) {
            throw new Error('API_URL and API_KEY must be defined');
        }

        super(apiUrl, {
            apiKey,
        });
    }

    getSources(callback: (sources: Source[]) => void): void {
        super.getResp({ endpoint: 'sources' }, (data) => {
            if (!isSourcesResponse(data)) {
                console.error('Invalid sources API response');
                return;
            }

            callback(data.sources);
        });
    }

    loadNews(sourceId: string, callback: (articles: Article[]) => void): void {
        super.getResp(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            (data) => {
                if (!isNewsResponse(data)) {
                    console.error('Invalid news API response');
                    return;
                }

                callback(data.articles);
            }
        );
    }
}

export default AppLoader;
