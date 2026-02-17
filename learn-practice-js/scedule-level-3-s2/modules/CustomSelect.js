export class CustomSelect {
    constructor(id, onSelect) {
        this.container = document.getElementById(id);
        if (!this.container) return;
        
        this.trigger = this.container.querySelector('.select-trigger');
        this.optionsContainer = this.container.querySelector('.select-options');
        this.hiddenSelect = this.container.parentElement.querySelector('select');
        this.onSelect = onSelect;
        this.id = id;

        this.init();
    }

    init() {
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select').forEach(d => {
                if (d !== this.container) d.classList.remove('active');
            });
            this.container.classList.toggle('active');
        });

        this.container.addEventListener('click', (e) => {
            const option = e.target.closest('.option');
            if (option) {
                this.select(option.dataset.value, option.textContent);
            }
        });
    }

    select(value, text) {
        this.trigger.querySelector('span').textContent = text;
        this.container.querySelectorAll('.option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === value);
        });
        if (this.hiddenSelect) this.hiddenSelect.value = value;
        this.container.classList.remove('active');
        if (this.onSelect) this.onSelect(this.id, value);
    }

    reset() {
        const defaultOption = this.container.querySelector('.option[data-value="all"]');
        if (defaultOption) {
            this.select('all', defaultOption.textContent);
        }
    }

    static closeAll(exceptContainer) {
        document.querySelectorAll('.custom-select').forEach(d => {
            if (d !== exceptContainer) d.classList.remove('active');
        });
    }
}
