import type { Article, Source } from './api.type';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(onSuccess: (sources: Source[]) => void, onError: (error: Error) => void): void {
        super.getSources(onSuccess, onError);
    }

    public getNews(
        event: Event,
        onLoading: () => void,
        onSuccess: (articles: Article[]) => void,
        onError: (error: Error) => void
    ): void {
        const newsContainer: HTMLElement | null =
            event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
        let target: HTMLElement | null = event.target instanceof HTMLElement ? event.target : null;

        if (newsContainer === null || target === null) {
            return;
        }

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');

                if (sourceId !== null) {
                    const activeSourceItem: HTMLElement | null =
                        newsContainer.querySelector<HTMLElement>('.source__item.active');

                    activeSourceItem?.classList.remove('active');
                    target.classList.add('active');

                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        onLoading();
                        super.loadNews(sourceId, onSuccess, onError);
                    }
                }

                return;
            }

            if (target.parentElement === null) {
                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
