enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Head = 'HEAD',
    Options = 'OPTIONS',
}

interface RequestOptions {
    [key: string]: string;
}

interface RequestConfig {
    endpoint: string;
    options?: RequestOptions;
}

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    public constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} as RequestOptions }: RequestConfig,
        onSuccess: (data: unknown) => void = (): void => {
            console.error('No callback for GET response');
        },
        onError: (error: Error) => void = (error: Error): void => {
            console.error(error);
        }
    ): void {
        this.load(HttpMethod.Get, endpoint, onSuccess, options, onError);
    }

    private async errorHandler(res: Response): Promise<Response> {
        if (!res.ok) {
            let message: string = res.statusText || `Request failed with status ${res.status}`;

            try {
                const data: unknown = await res.json();

                if (
                    typeof data === 'object' &&
                    data !== null &&
                    'message' in data &&
                    typeof data.message === 'string'
                ) {
                    message = data.message;
                }
            } catch {}

            throw new Error(message);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: HttpMethod,
        endpoint: string,
        onSuccess: (data: unknown) => void,
        options: RequestOptions = {},
        onError: (error: Error) => void
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<unknown> => res.json())
            .then((data: unknown): void => onSuccess(data))
            .catch((err: unknown): void => onError(err instanceof Error ? err : new Error(String(err))));
    }
}

export default Loader;
