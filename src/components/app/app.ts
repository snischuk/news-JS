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
        const sourcesContainer = document.querySelector('.sources');

        if (sourcesContainer === null) {
            throw new Error('Sources container not found');
        }

        sourcesContainer.addEventListener('click', (event) =>
            this.controller.getNews(event, (articles) => this.view.drawNews(articles))
        );

        this.controller.getSources((sources) => this.view.drawSources(sources));
    }
}

export default App;
