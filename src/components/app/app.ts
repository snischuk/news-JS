import AppController from '../controller/controller';
import { AsyncStatus } from '../view/asyncState.type';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');

        if (sourcesContainer === null) {
            throw new Error('Sources container not found');
        }

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(
                event,
                (): void => this.view.renderNews({ status: AsyncStatus.Loading }),
                (articles): void => this.view.renderNews({ status: AsyncStatus.Success, data: articles }),
                (error): void => this.view.renderNews({ status: AsyncStatus.Error, error })
            );
        });

        this.view.renderSources({ status: AsyncStatus.Loading });
        this.controller.getSources(
            (sources): void => this.view.renderSources({ status: AsyncStatus.Success, data: sources }),
            (error): void => this.view.renderSources({ status: AsyncStatus.Error, error })
        );
    }
}

export default App;
