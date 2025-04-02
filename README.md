### Installation and running

```
`npm install`
`npm run start`
```

### ТРЕБОВАНИЯ

* Шрифт Roboto, подключить с помощью Google Fonts.
* При клике на кнопку join Meetup пользователь попадает на вторую страницу“Events near New York, NY‘.
* Из функциональной части только фильтрация мероприятий. Реализовать фильтрацию по дате, типу мероприятия, дистанции и категории (все опции для выбора вы найдете в мок данных к проекту (см. ниже)).
* Веб сайт должен быть адаптивным.
* При клике на лого (навбар левый верхний угол) пользователь попадает на главную страницу.

### Вспомогательные материалы:

* [Макет](https://www.figma.com/design/UBaXIaY5FwCYXhNxkVa5Xv/Front-end-project?node-id=0-1&p=f&t=VGYIgNtuDsrLMHEE-0)
* Мок данные (ненастоящие данные, которые нужны для заполнения пространства).


### Описание фильтров проекта:

Category:

* Social Activities
* Hobbies and Passions
* Health and Wellbeing
* Business
* Technology
  Указывается в описание карточки мероприятия.

Distance

* 5 km
* 10 km
* 15 km
* 25 km
* 75 km
* 50 km
* 100 km
  Указывается в описание карточки в случае, если мероприятие проходит в очном формате.

Type

* Online
* Offline
  В тех мероприятиях, где указано расстояние означает что мероприятие проходит в
  очном формате, где нет, означает что мероприятие проводиться в онлайне. Также
  отдельно отображается тип в карточки мероприятия.

Day

* Mar 13, 11:00 AM
* Mar 14, 11:00 AM
* Mar 14, 8:00 PM
* Mar 16, 2:00 PM
* Mar 23, 11:30 AM
* Mar 30, 2:00 PM
  Рассчитывается на основе дня мероприятия.


