import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesContainer = document.querySelector<HTMLDivElement>('.sources');

        if (sourcesContainer === null) {
            throw new Error('Sources container not found');
        }

        sourcesContainer.addEventListener('click', (event: MouseEvent): void =>
            this.controller.getNews(event, (articles): void => this.view.drawNews(articles))
        );

        this.controller.getSources((sources): void => this.view.drawSources(sources));
    }
}

export default App;
