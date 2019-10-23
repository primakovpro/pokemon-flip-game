const gameProps = {
    points: 0,
    fieldWidth: 5,
    fieldHeight: 6
};

const gameField = document.getElementById('game-field');

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

gameField.innerHTML = '';

const usedBgs = [];

const pokemonsCount = gameProps.fieldHeight * gameProps.fieldWidth;

let iterator = 0;

for (let i = 0; i < gameProps.fieldWidth; i++) {
    const row = document.createElement('div');
    row.classList.add('cards-row');

    for (let j = 0; j < gameProps.fieldHeight; j++) {
        iterator++;
        const ceil = document.createElement('div');
        ceil.classList.add('card');

        if ((pokemonsCount/2) >= iterator) {
            const cardNumber = Math.floor(Math.random() * cardsBgs.length);
            const selectedBg = cardsBgs[cardNumber];
            usedBgs.push(selectedBg);

            ceil.style.backgroundPositionX = '-' + selectedBg.x + 'px';
            ceil.style.backgroundPositionY = '-' + selectedBg.y + 'px';

            ceil.dataset.elementId = selectedBg.id;

            row.appendChild(ceil);
        } else {
            const selectedBg = usedBgs.pop();

            ceil.style.backgroundPositionX = '-' + selectedBg.x + 'px';
            ceil.style.backgroundPositionY = '-' + selectedBg.y + 'px';

            ceil.dataset.elementId = selectedBg.id;

            row.appendChild(ceil);
        }

        ceil.onclick = ceilClickHandler
    }

    gameField.appendChild(row);
}

let firstElement;

function ceilClickHandler(event) {
    const el = event.target;
    const elementId = el.dataset.elementId;
    el.classList.add('opened');

    if (!firstElement) {
        firstElement = {
            el: event.target,
            id: elementId
        };
    } else if(elementId === firstElement.id) {
        firstElement = null;
    } else {
        setTimeout(function() {
            firstElement.el.classList.remove('opened');
            el.classList.remove('opened');
            firstElement = null;
        }, 500);
    }
}
