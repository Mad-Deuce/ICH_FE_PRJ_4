import events from '../data/events.json' with {type: "json"};
import categories from '../data/categories.json' with {type: "json"};
import { renderEventsCards } from './event_card_render.js';

import moment from 'moment-timezone';


const citySearchParam = new URLSearchParams(window.location.search).get('city') || 'New York, NY';

initEventsNearPage();
function initEventsNearPage() {
    initFilters(citySearchParam);
    renderEventsCardsByCities(citySearchParam);
    setTitles(citySearchParam);
}

function renderEventsCardsByCities(city = "New York, NY") {
    let filteredEvents = events.filter(event => event.place === city);
    let predicates = getPredicates();
    predicates.forEach(pred => {
        filteredEvents = filteredEvents.filter(pred);
    });
    const eventsNearCardsContainer = document.querySelector('#events-near-filter-cards');
    eventsNearCardsContainer.innerHTML = '';
    eventsNearCardsContainer.appendChild(renderEventsCards(filteredEvents, true));
}


const browseInMapBtn = document.querySelector('#browse-in-map-btn');
browseInMapBtn.addEventListener('click', () => {
    window.open("https://www.google.com/maps/@52.3237717,13.8532795,68077m/data=!3m1!1e3?authuser=0&entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D", "_blank");
});


function initFilters(city = "New York, NY") {
    const selectTypeElem = document.querySelector('#events-near-type-select');
    const selectDistElem = document.querySelector('#events-near-distance-select');
    const selectCategoryElem = document.querySelector('#events-near-category-select');
    const selectDateElem = document.querySelector('#events-near-date-select');

    const typeOpts = ['Online', 'Offline'];
    let selectOptions = selectTypeElem.options;
    selectOptions.add(new Option('Any type', '', true));
    typeOpts.map(item => {
        selectOptions.add(new Option(item, item.toLowerCase()));
    });
    selectTypeElem.addEventListener('change', (event) => {
        renderEventsCardsByCities(citySearchParam);
    });

    const distanceOpts = [5, 10, 15, 25, 50, 75, 100];
    selectOptions = selectDistElem.options;
    selectOptions.add(new Option('Any distance', '', true));
    distanceOpts.map(item => {
        selectOptions.add(new Option(`${item} km`, item));
    });
    selectDistElem.addEventListener('change', (event) => {
        renderEventsCardsByCities(citySearchParam);
    });

    selectOptions = selectCategoryElem.options;
    selectOptions.add(new Option('Any category', '', true));
    categories.map(item => {
        selectOptions.add(new Option(item.title, item.title));
    });
    selectCategoryElem.addEventListener('change', (event) => {
        renderEventsCardsByCities(citySearchParam);
    });

    selectOptions = selectDateElem?.options;
    let filteredEvents = events.filter(event => event.place === city);
    const distinctEventsDateValues = filteredEvents
        .filter(events => events.date)
        .filter((event, index, self) => {
            return index === self.findIndex((t) => (
                t.date === event.date
            ))
        })
        .map(event => event.date)
        .sort()
        .reverse();
    selectOptions?.add(new Option('Any date', '', true));
    distinctEventsDateValues.forEach(item => {
        selectOptions?.add(new Option(moment(item).format("MMM D, h:mm A"), item));
    });

    selectDateElem?.addEventListener('change', (event) => {
        renderEventsCardsByCities(citySearchParam);
    });

};

function getPredicates() {
    const selectTypeElem = document.querySelector('#events-near-type-select');
    const selectDistElem = document.querySelector('#events-near-distance-select');
    const selectCategoryElem = document.querySelector('#events-near-category-select');
    const selectDateElem = document.querySelector('#events-near-date-select');


    let typePredicate = () => { return true };
    let distPredicate = () => { return true };
    let categoryPredicate = () => { return true };
    let datePredicate = () => { return true };

    if (selectTypeElem.value && selectTypeElem.value != '') {
        typePredicate = (item) => {
            if (selectTypeElem.value === 'online') {
                return item.type ? item.type === selectTypeElem.value : (item.distance == null || item.distance == "" || Number.parseInt(item.distance) <= 0);
            }
            if (selectTypeElem.value === 'offline') {
                return item.type ? item.type === selectTypeElem.value : (Number.parseInt(item.distance) > 0);
            }
            return false;
        }
    }
    if (selectDistElem.value && selectDistElem.value != '') {
        distPredicate = (item) => { return item.distance <= selectDistElem.value };
    }
    if (selectCategoryElem.value && selectCategoryElem.value != '') {
        categoryPredicate = (item) => { return item.category === selectCategoryElem.value; };
    }
    if (selectDateElem?.value && selectDateElem.value != '') {
        datePredicate = (item) => {
            // let minDate = moment(selectDateElem.value).hour(0).minute(0);
            // let maxDate = moment(selectDateElem.value).hour(23).minute(59);
            // return item.date >= minDate && item.date < maxDate;
            return item.date === selectDateElem.value;
        };
    }

    let predicates = [];
    predicates.push(typePredicate);
    predicates.push(distPredicate);
    predicates.push(categoryPredicate);
    predicates.push(datePredicate);
    return predicates;
}

function setTitles(city) {
    const leftTitle = document.querySelector('#events-near-left-title');
    leftTitle.innerHTML = `Events near ${city}`;
    const rightTitle = document.querySelector('#events-near-right-title');
    rightTitle.innerHTML = `${city}`;
}