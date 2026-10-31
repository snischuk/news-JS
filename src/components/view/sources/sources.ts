import type { Source } from '../../controller/api.type';
import { AsyncStatus, MessageRole, type AsyncState } from '../asyncState.type';
import { importTemplateContent } from '../dom.util';
import './sources.css';

class Sources {
    public render(state: AsyncState<Source[]>): void {
        if (state.status === AsyncStatus.Loading) {
            this.showMessage({ message: 'Loading sources...', state: AsyncStatus.Loading });
            return;
        }

        if (state.status === AsyncStatus.Error) {
            this.showMessage({ message: state.error.message, state: AsyncStatus.Error });
            return;
        }

        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null =
            document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');

        if (sourceItemTemp === null || sourcesContainer === null) {
            throw new Error('Sources template or container not found');
        }

        if (state.data.length === 0) {
            this.showMessage({ message: 'No sources available.', state: AsyncStatus.Empty });
            return;
        }

        state.data.forEach((item): void => {
            const sourceClone: DocumentFragment = importTemplateContent(sourceItemTemp, { deep: true });

            const sourceName: HTMLSpanElement | null = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
            const sourceItem: HTMLDivElement | null = sourceClone.querySelector<HTMLDivElement>('.source__item');

            if (sourceName === null || sourceItem === null) {
                throw new Error('Invalid source item template');
            }

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.replaceChildren(fragment);
        sourcesContainer.setAttribute('aria-busy', 'false');
    }

    private showMessage({
        message,
        state,
    }: {
        message: string;
        state: AsyncStatus.Loading | AsyncStatus.Error | AsyncStatus.Empty;
    }): void {
        const sourcesContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');

        if (sourcesContainer === null) {
            throw new Error('Sources container not found');
        }

        const role: MessageRole = state === AsyncStatus.Error ? MessageRole.Alert : MessageRole.Status;
        const stateMessage: HTMLParagraphElement = document.createElement('p');
        stateMessage.className =
            state === AsyncStatus.Error
                ? 'sources__state sources__state_error'
                : state === AsyncStatus.Loading
                  ? 'sources__state sources__state_loading'
                  : 'sources__state';
        stateMessage.setAttribute('role', role);
        stateMessage.textContent = message;

        sourcesContainer.replaceChildren(stateMessage);
        sourcesContainer.setAttribute('aria-busy', String(state === AsyncStatus.Loading));
    }
}

export default Sources;
