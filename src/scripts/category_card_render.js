export function renderCategoriesCards(cardList) {
    const fragment = document.createDocumentFragment();
    cardList.forEach(item => {
        let cardElem = document.createElement('a');
        cardElem.classList.add('category__card');
        cardElem.innerHTML = `
            <img src=${item.icon} alt="">
            <p>${item.title}</p>
        `;
        fragment.appendChild(cardElem);
    });
    return fragment;
};
