import type { Article } from '../../controller/api.type';
import { importTemplateContent } from '../dom.util';
import './news.css';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.slice(0, 10);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.news');

        if (newsItemTemp === null || newsContainer === null) {
            throw new Error('News template or container not found');
        }

        news.forEach((item, idx): void => {
            const newsClone: DocumentFragment = importTemplateContent(newsItemTemp, { deep: true });

            const newsItem: HTMLDivElement | null = newsClone.querySelector<HTMLDivElement>('.news__item');
            const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
            const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector<HTMLLIElement>('.news__meta-author');
            const newsMetaDate: HTMLLIElement | null = newsClone.querySelector<HTMLLIElement>('.news__meta-date');
            const newsTitle: HTMLHeadingElement | null = newsClone.querySelector<HTMLHeadingElement>('.news__description-title');
            const newsSource: HTMLHeadingElement | null = newsClone.querySelector<HTMLHeadingElement>('.news__description-source');
            const newsDescription: HTMLParagraphElement | null = newsClone.querySelector<HTMLParagraphElement>('.news__description-content');
            const newsLink: HTMLAnchorElement | null = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (
                newsItem === null ||
                newsMetaPhoto === null ||
                newsMetaAuthor === null ||
                newsMetaDate === null ||
                newsTitle === null ||
                newsSource === null ||
                newsDescription === null ||
                newsLink === null
            ) {
                throw new Error('Invalid news item template');
            }

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            newsTitle.textContent = item.title;
            newsSource.textContent = item.source.name;
            newsDescription.textContent = item.description;
            newsLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
