import type { Source } from '../../controller/api.type';
import './sources.css';

class Sources {
    public draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');

        if (sourceItemTemp === null || sourcesContainer === null) {
            throw new Error('Sources template or container not found');
        }

        data.forEach((item): void => {
            const sourceClone: DocumentFragment = document.importNode(sourceItemTemp.content, true);

            const sourceName: HTMLSpanElement | null = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
            const sourceItem: HTMLDivElement | null = sourceClone.querySelector<HTMLDivElement>('.source__item');

            if (sourceName === null || sourceItem === null) {
                throw new Error('Invalid source item template');
            }

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;
