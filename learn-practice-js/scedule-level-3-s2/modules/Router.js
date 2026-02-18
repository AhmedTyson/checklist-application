export class Router {
    #currentView = 'schedule';
    #callbacks = [];

    constructor(defaultView = 'schedule') {
        // Initialize from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const viewParam = urlParams.get('view');
        if (viewParam) {
            this.#currentView = viewParam;
        } else {
            this.#currentView = defaultView;
        }

        this.#init();
    }

    #init() {
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view) {
                this.#notify(e.state.view);
            } else {
                // Handle back to initial state (e.g. no query param)
                const urlParams = new URLSearchParams(window.location.search);
                this.#notify(urlParams.get('view') || 'schedule');
            }
        });
    }

    get currentView() { return this.#currentView; }

    navigate(view, replace = false) {
        if (this.#currentView === view && !replace) return;
        
        this.#currentView = view;
        const url = new URL(window.location);
        url.searchParams.set('view', view);

        if (replace) {
            window.history.replaceState({ view }, '', url);
        } else {
            window.history.pushState({ view }, '', url);
        }
        
        this.#notify(view);
    }

    onViewChange(callback) {
        this.#callbacks.push(callback);
    }

    #notify(view) {
        this.#currentView = view;
        this.#callbacks.forEach(cb => cb(view));
    }
}
