import type { Source } from '../../controller/api.type';
import './sources.css';

class Sources {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer = document.querySelector<HTMLDivElement>('.sources');

        if (sourceItemTemp === null || sourcesContainer === null) {
            throw new Error('Sources template or container not found');
        }

        data.forEach((item): void => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            const sourceName = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLDivElement>('.source__item');

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
