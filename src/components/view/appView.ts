import type { Article, Source } from '../controller/api.type';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(articles: Article[]): void {
        this.news.draw(articles);
    }

    drawSources(sources: Source[]): void {
        this.sources.draw(sources);
    }
}

export default AppView;
