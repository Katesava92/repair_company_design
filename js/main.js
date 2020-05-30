/*document.addEventListener('DOMContentLoaded', function(event) {  //проверка прогрузилась ли страница
  const modal = document.querySelector('.modal'); // переменная кот находит элемент с классом modal
  const modalBtn = document.querySelectorAll('[data-toggle=modal]'); // переменная которая находит все элементы с атрибутом
  const toggleModal = () => {
    modal.classList.toggle('modal--visible');
  } //функция которая переключает класс, включает если его нет, и выкл если он есть
  const closeBtn = document.querySelector('.modal__close');



  modalBtn.forEach(element => {
    element.addEventListener('click', toggleModal);
  });
  closeBtn.addEventListener('click', toggleModal);



  document.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) {
      modal.classList.toggle('modal--visible');
    }
    
  });

  document.addEventListener('click', function(window) {
    if (window.target == modal) {
      modal.classList.toggle('modal--visible');
    }
  });

});*/

$(document).ready(function () {

  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 2000);
  });


  //модальное окно
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');
  
  modalBtn.on('click', function() { //при нажатии на кнопки появляется модалка
    modal.toggleClass('modal--visible');
  });

  closeBtn.on('click', function() { //при нажатии на крест закрывается окно модал
    modal.toggleClass('modal--visible');
    $('.modal__form')[0].reset();
  });

  $(document).on('keydown', function (e) { //при нажатии esc закрывается окно
    if (e.keyCode == 27) {
      modal.toggleClass('modal--visible');
      $('.modal__form')[0].reset();
    }
  });

 $(document).on('click', function(e) { //при нажатии вне окна закрывается оно
      if ( modal.is(e.target) ) {
        modal.toggleClass('modal--visible');
        $('.modal__form')[0].reset();
    };
      
  });

  //окно благодарности
  var thanks = $('.modal-thanks'),
      closeThanks = $('.modal-thanks__close');
    
    closeThanks.on('click', function() {
      thanks.removeClass('modal-thanks--visible');
    });



  //кнопка наверх
  var up = $('.button-up');
  $(window).scroll( function() { //при прокрутке появление и скрытие кнопки
    if ($(this).scrollTop () > 300) {
      up.show('slow');
    } else {
      up.hide('slow');
    }
  });
  
  up.on('click', function() { //плавноая прокрутка при нажатии
    $('html, body').animate({scrollTop:0}, '3000');
  });


  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');
//делаем чтобы расстояние в пагинации слайдов рассчитывалось авто вне зависимости от кол-ва слайдов
  next.css('left', prev.width() + 20 + bullets.width() + 20)
  bullets.css('left', prev.width() + 20)



  
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animate__animated', // animation css class (default is animated)
      offset:       30,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();

  //Валидация формы
  $('.modal__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    rules: {
      userName: {  // compound rule, правило-объект (блок)
        required: true,
        rangelength: [2, 15]
      },
      userPhone: {
        required: true,
        minlength: 18
      },  // simple rule, converted to {required:true}, строчное правило
      userEmail: {
        required: true,
        email: true
      },
      policyCheckboxModal: "required"
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        rangelength: "Не короче 2 и не больше 15 символов"
      },
      userPhone: {
        required: "Телефон обязателен",
        minlength: "Укажите верный номер"
      },
      userEmail: {
        required: "Обязательно укажите email",
        email: "Укажите корректный email"
      },
      policyCheckboxModal: "Поле обязательно для заполнения"
    },
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
      }
  
    error.insertAfter($(element));
  },


    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $('form').serialize(),
        success: function (response) {
          onclick="ym(64409401,'reachGoal','form'); return true;"
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          thanks.addClass('modal-thanks--visible');
        }
      });
    }

  });

  $('.control__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    rules: {
      userName: {  // compound rule, правило-объект (блок)
        required: true,
        rangelength: [2, 15]
      },
      userPhone: {
        required: true,
        minlength: 18
      },  // simple rule, converted to {required:true}, строчное правило
      userEmail: {
        required: true,
        email: true
      },
      policyCheckboxControl: "required"
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        rangelength: "Не короче 2 и не больше 15 символов"
      },
      userPhone: {
        required: "Телефон обязателен",
        minlength: "Укажите верный номер"
      },
      userEmail: {
        required: "Обязательно укажите email",
        email: "Укажите корректный email"
      },
      policyCheckboxControl: "Поле обязательно для заполнения"
    },
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
      }
  
    error.insertAfter($(element));
  },

  submitHandler: function(form) {
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $('form').serialize(),
      success: function (response) {
        onclick="ym(64409401,'reachGoal','form'); return true;"
        $(form)[0].reset();
        modal.removeClass('modal--visible');
        thanks.addClass('modal-thanks--visible');
      }
    });
  }

  });


  $('.footer__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    rules: {
      // simple rule, converted to {required:true}, строчное правило
      userName: {
        required: true,
        rangelength: [2, 15]
      },
      userPhone: {
        required: true,
        minlength: 18
      },
      // compound rule, правило-объект (блок)
      userQuestion: "required",
      policyCheckbox: "required"
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        rangelength: "Не короче 2 и не больше 15 символов"
      },
      userPhone: {
        required: "Телефон обязателен",
        minlength: "Укажите верный номер"
      },
      userQuestion: "Заполните поле",
      policyCheckbox: "Поле обязательно для заполнения"
    },
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
      }
  
      error.insertAfter($(element));
  },



  submitHandler: function(form) {
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $('form').serialize(),
      success: function (response) {
        onclick="ym(64409401,'reachGoal','form'); return true;"
        $(form)[0].reset();
        modal.removeClass('modal--visible');
        thanks.addClass('modal-thanks--visible');

      }
    });
  }
  
  });

  //$(window).unload(function(){ 
  //  $('.modal__form')[0].reset();
  //});
  //$(window).unload(function(){ 
  //  $('.control__form')[0].reset();
  //});
  //$(window).unload(function(){ 
  //  $('.footer__form')[0].reset();
  //});


  //phone mask
  $('[type=tel]').mask('+7 (999) 999-99-99', {'translation': {9: {pattern: /[0-9*]/}}});

  //$('[type=tel]').on("keydown", function (e) {
  //  return e.which !== 32;
  //});​​​​​


  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: '8awdQRP816c',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  };

  //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
  var check_if_load = false;
  //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
  var myMapTemp, myPlacemarkTemp;


  //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [54.711553, 20.508505],
    zoom: 15 // коэффициент приближения карты
  });
  var myPlacemarkTemp = new ymaps.Placemark([54.711553, 20.508505], {
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
  myMapTemp.geoObjects.add(myPlacemarkTemp);
  myMapTemp.behaviors
      .disable(['scrollZoom','drag']);
  myMapTemp.container.fitToViewport(); // помещаем флажок на карту
 
  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);
 
  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function() {

  });
}
 
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}
 
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
 
// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
	  	// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
		// Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?apikey=e60cd017-ce1b-425a-9351-8480ad150ce4&lang=ru_RU", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
}
 
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});
    







});


