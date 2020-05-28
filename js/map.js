ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [54.711553, 20.508505],
          zoom: 15
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Наша организация',
          balloonContent: 'Ленинский проспект, 30, Калининград, Россия, 236006'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/location.png',
          // Размеры метки.
          iconImageSize: [32, 32],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
      });
  myMap.geoObjects
      .add(myPlacemark);
  myMap.behaviors
      .disable(['scrollZoom','drag']);
  myMap.container.fitToViewport();
});