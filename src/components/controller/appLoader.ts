import type { Article, Source } from './api.type';
import { isNewsResponse, isSourcesResponse } from './api.util';
import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const apiUrl: string | undefined = process.env.API_URL;
        const apiKey: string | undefined = process.env.API_KEY;

        if (apiUrl === undefined || apiKey === undefined) {
            throw new Error('API_URL and API_KEY must be defined');
        }

        super(apiUrl, {
            apiKey,
        });
    }

    public getSources(callback: (sources: Source[]) => void): void {
        super.getResp({ endpoint: 'sources' }, (data): void => {
            if (!isSourcesResponse(data)) {
                console.error('Invalid sources API response');
                return;
            }

            callback(data.sources);
        });
    }

    public loadNews(sourceId: string, callback: (articles: Article[]) => void): void {
        super.getResp(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            (data): void => {
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
