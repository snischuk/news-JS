import type { Article, Source } from './api.type';
import { isNewsResponse, isSourcesResponse } from './api.util';
import Loader from './loader';

enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

class AppLoader extends Loader {
    public constructor() {
        const apiUrl: string | undefined = process.env.API_URL;
        const apiKey: string | undefined = process.env.API_KEY;

        if (apiUrl === undefined) {
            throw new Error('API_URL must be defined');
        }

        super(apiUrl, apiKey ? { apiKey } : {});
    }

    public getSources(onSuccess: (sources: Source[]) => void, onError: (error: Error) => void): void {
        super.getResp(
            { endpoint: ApiEndpoint.Sources },
            (data): void => {
                if (!isSourcesResponse(data)) {
                    onError(new Error('Invalid sources API response'));
                    return;
                }

                onSuccess(data.sources);
            },
            onError
        );
    }

    public loadNews(sourceId: string, onSuccess: (articles: Article[]) => void, onError: (error: Error) => void): void {
        super.getResp(
            {
                endpoint: ApiEndpoint.Everything,
                options: {
                    sources: sourceId,
                },
            },
            (data): void => {
                if (!isNewsResponse(data)) {
                    onError(new Error('Invalid news API response'));
                    return;
                }

                onSuccess(data.articles);
            },
            onError
        );
    }
}

export default AppLoader;
