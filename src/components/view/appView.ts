import type { Article, Source } from '../controller/api.type';
import type { AsyncState } from './asyncState.type';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public renderNews(state: AsyncState<Article[]>): void {
        this.news.render(state);
    }

    public renderSources(state: AsyncState<Source[]>): void {
        this.sources.render(state);
    }
}

export default AppView;
