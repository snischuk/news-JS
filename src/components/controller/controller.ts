import type { Article, Source } from './api.type';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: (sources: Source[]) => void): void {
        super.getSources(callback);
    }

    public getNews(event: Event, callback: (articles: Article[]) => void): void {
        const newsContainer = event.currentTarget;
        let target: Element | null = event.target instanceof Element ? event.target : null;

        if (!(newsContainer instanceof Element) || target === null) {
            return;
        }

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.loadNews(sourceId, callback);
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
