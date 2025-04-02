export function renderCitiesCards(cardList) {
    const fragment = document.createDocumentFragment();
    cardList.forEach(item => {
        let cardElem = document.createElement('a');
        cardElem.classList.add('city-card');
        cardElem.innerHTML = `
            <img class="city-card__img" src=${item.icon} alt="">
            <p class="city-card__title">${item.title}</p>
        `;
        fragment.appendChild(cardElem);
    });
    return fragment;
};