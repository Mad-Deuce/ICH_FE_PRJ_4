import events from '../data/events.json' with {type: "json"};
import categories from '../data/categories.json' with {type: "json"};
import cities from '../data/cities.json' with {type: "json"};
import friendships from '../data/friendships.json' with {type: "json"};

import { renderEventsCards } from './event_card_render.js';
import { renderCategoriesCards } from './category_card_render.js';
import { renderCitiesCards } from './city_card_render.js';
import { renderFriendshipsCards } from './friendshipsCardRender.js';

initMainPage();

function initMainPage() {
    initEventsNearSearch(events);
    renderEventsNearCards(events);
    renderUpcomingEventsCards(events);
    renderTopCategoriesCards();
    renderPopularCitiesCards();
    renderFriendships();
}

function initEventsNearSearch(events) {
    const eventsNearSearchInp = document.querySelector('#events-near-search-input');
    const eventsNearSearchBtn = document.querySelector('#events-near-search-btn');
    const eventsNearSearchDataListElement = document.querySelector('#events-near-search-data-list');
    eventsNearSearchDataListElement.innerHTML = '';

    const distinctEventsPlaces = events
        .filter(events => events.place)
        .filter((event, index, self) => {
            return index === self.findIndex((t) => (
                t.place === event.place
            ))
        })
        .map(event => event.place);

    distinctEventsPlaces.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        eventsNearSearchDataListElement.appendChild(optionElement);
    });

    eventsNearSearchBtn.addEventListener('click', () => {
        let regexp = new RegExp(eventsNearSearchInp.value, 'gi');
        let filteredEvents = events.filter(event => {
            if (eventsNearSearchInp.value.trim === '') {
                return true;
            };
            if (!event.place) {
                return false;
            };
            return event.place.match(regexp);
        });
        renderEventsNearCards(filteredEvents);
    });
}

function renderEventsNearCards(events) {
    const eventsNearCardsContainer = document.querySelector('#events-near-cards');
    eventsNearCardsContainer.innerHTML = '';
    eventsNearCardsContainer.appendChild(renderEventsCards(events));
}

function renderUpcomingEventsCards(events) {
    const upcomingEvents = events.filter(event => event.upcoming_online);
    const eventsUpcomingCardsContainer = document.querySelector('#events-upcoming-cards');
    eventsUpcomingCardsContainer.innerHTML = '';
    eventsUpcomingCardsContainer.appendChild(renderEventsCards(upcomingEvents))
}

async function renderTopCategoriesCards() {
    const topCategoriesContainer = document.querySelector('#categories-top-cards');
    topCategoriesContainer.innerHTML = '';
    const topCategories = await Promise.resolve(categories);
    topCategoriesContainer.appendChild(renderCategoriesCards(topCategories));
}

async function renderPopularCitiesCards() {
    const popularCitiesContainer = document.querySelector('#popular-cities-card-container');
    popularCitiesContainer.innerHTML = '';
    const popularCities = await Promise.resolve(cities);
    popularCitiesContainer.appendChild(renderCitiesCards(popularCities));
}

async function renderFriendships() {
    const friendshipsCardsContainer = document.querySelector('#friendships-cards-container');
    friendshipsCardsContainer.innerHTML = '';
    const friendshipsCards = await Promise.resolve(friendships);
    friendshipsCardsContainer.appendChild(renderFriendshipsCards(friendshipsCards));
}