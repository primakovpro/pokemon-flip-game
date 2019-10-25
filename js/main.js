const cardsBgs = [
    { x: 12, y: 20, id: '12x20' },
    { x: 146, y: 20, id: '146x20' },
    { x: 280, y: 20, id: '280x20' },
    { x: 413, y: 20, id: '413x20' },
    { x: 544, y: 20, id: '544x20' },
    { x: 12, y: 154, id: '12x154' },
    { x: 146, y: 284, id: '146x284' },
    { x: 280, y: 409, id: '280x409' },
    { x: 413, y: 543, id: '413x543' },
    { x: 544, y: 20, id: '544x20' },
    { x: 12, y: 284, id: '12x284' },
    { x: 12, y: 409, id: '12x409' },
    { x: 12, y: 543, id: '12x543' },
];

class Game {
    constructor(gameProps) {
        this.settings = gameProps;
        this.gameField = document.getElementById(gameProps.fieldId);

        this.cards = [];
        this.firstElement = null;
        this.isDisabled = false;
        this.clearField();
    }

    init() {
        const usedBgs = [];
        const pokemonsCount = this.settings.fieldHeight * this.settings.fieldWidth;
    
        for (let i = 0; i < pokemonsCount; i++) {
            let selectedBg;

            if ((pokemonsCount/2) >= i) {
                const cardNumber = Math.floor(Math.random() * this.settings.cardsBgs.length);
                selectedBg = this.settings.cardsBgs[cardNumber];
                usedBgs.push(selectedBg);
            } else {
                selectedBg = usedBgs.pop();
            }

            this.cards.push(selectedBg);
        }

        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }

    render() {
        this.clearField();

        let iterator = 0;
        for (let i = 0; i < this.settings.fieldWidth; i++) {
            const row = document.createElement('div');
            row.classList.add('cards-row');

            for (let j = 0; j < this.settings.fieldHeight; j++) {

                const currentCeil = this.cards[iterator];

                const ceil = document.createElement('div');
                ceil.classList.add('card');
                
                ceil.style.backgroundPositionX = '-' + currentCeil.x + 'px';
                ceil.style.backgroundPositionY = '-' + currentCeil.y + 'px';

                ceil.dataset.elementId = currentCeil.id;

                row.appendChild(ceil);

                ceil.onclick = this.ceilClickHandler

                iterator++;
            }

            this.gameField.appendChild(row);
        }
    }

    ceilClickHandler = (event) => {
        if(!this.isDisabled) {
            const el = event.target;
            const elementId = el.dataset.elementId;
            el.classList.add('opened');

            if (!this.firstElement) {
                this.firstElement = {
                    el: event.target,
                    id: elementId
                };
            } else if(elementId === this.firstElement.id) {
                this.firstElement = null;
            } else {
                this.isDisabled = true;
                setTimeout(() => {
                    this.firstElement.el.classList.remove('opened');
                    el.classList.remove('opened');
                    this.firstElement = null;
                    this.isDisabled = false;
                }, 500);
            }
        }
    }

    clearField() {
        this.gameField.innerHTML = '';
    }
}

const game = new Game({
    points: 0,
    fieldWidth: 6,
    fieldHeight: 5,
    fieldId: 'game-field',
    cardsBgs
});

game.init();
game.render();

