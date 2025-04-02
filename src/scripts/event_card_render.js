import moment from 'moment-timezone';

export function renderEventsCards(cardList, opt = false) {
    let fragment = document.createDocumentFragment();
    if (!cardList || cardList.length === 0) {
        console.log('No events found');
        let errorElem = document.createElement('div');
        errorElem.classList.add('event-card__error');
        errorElem.innerHTML = '<p class="event-card__error">No events found</p>';
        fragment.appendChild(errorElem);
        return fragment;
    }
    cardList.forEach(card => {
        let cardElem = document.createElement('div');
        cardElem.classList.add('event-card');
        if (opt) cardElem.classList.add('event-card__hor');
        cardElem.innerHTML = `
            <img class="event-card__img" src=${card.image} alt=${card.image}>
            <div class="event-card__info">
                <h3 class="event-card__title">${card.title}</h3>
                <p class="event-card__category">${card.category} ${card.distance ? "(" + card.distance + " km)" : ''} </p>
                <div class="event-card__date">
                    <span class="material-symbols-outlined visible-true"> calendar_today </span>
                    <p>${moment(card.date).tz(card.tz ?? "UTC").format("ddd, MMM D &#183 h:mm a z")}</p>
                </div>
                <div class="event-card__going event-card__going_visible">
                    <div>
                        <span class="material-symbols-outlined"> check_circle </span>
                        <p>${card.going} going</p>
                    </div>
                    <div>
                        <span class="material-symbols-outlined"> confirmation_number </span>
                        <p>Free</p>
                    </div>
                </div>
                <div class="event-card__online event-card__online_hide" style="display:${card.type === "offline" ? "none" : ""}">
                    <span class="material-symbols-outlined videocam-fill"> videocam </span>
                    <p>Online Event</p>
                </div>
                <p class="event-card__attendees event-card__attendees_hide">${card.attendees ? card.attendees + " attendees" : ""}</p>
            </div>
        `;
        fragment.appendChild(cardElem);
    });

    return fragment;
};
