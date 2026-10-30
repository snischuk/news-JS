import type { Article, Source } from './api.type';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: (sources: Source[]) => void): void {
        super.getSources(callback);
    }

    public getNews(event: Event, callback: (articles: Article[]) => void): void {
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
                        super.loadNews(sourceId, callback);
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
