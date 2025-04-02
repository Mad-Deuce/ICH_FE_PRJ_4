export function renderFriendshipsCards(cardList) {
    const fragment = document.createDocumentFragment();
    cardList.forEach(item => {
        let cardElem = document.createElement('div');
        cardElem.classList.add('friendships-card');

        cardElem.innerHTML = `
            <img src="${item.imgSrc}" alt="" class="friendships-card__img">
            <h3 class="friendships-card__title">${item.title}</h3>
            <p class="friendships-card__description">${item.description}</p>
            <a class="friendships-card__link" href="">Read more</a>
        `;
        fragment.appendChild(cardElem);
    });
    return fragment;
};
