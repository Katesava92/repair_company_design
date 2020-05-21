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

  //модальное окно
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');
  
  modalBtn.on('click', function() { //при нажатии на кнопки появляется модалка
    modal.toggleClass('modal--visible');
  });

  closeBtn.on('click', function() { //при нажатии на крест закрывается окно модал
    modal.toggleClass('modal--visible');
  });

  $(document).on('keydown', function (e) { //при нажатии esc закрывается окно
    if (e.keyCode == 27) {
      modal.toggleClass('modal--visible');
    }
  });

 $(document).on('click', function(e) { //при нажатии вне окна закрывается оно
      if ( modal.is(e.target) ) {
        modal.toggleClass('modal--visible');
    };
      
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
  next.css('left', prev.width() + 30 + bullets.width() + 40)
  bullets.css('left', prev.width() + 30)

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
      // simple rule, converted to {required:true}, строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlenght: 15
      },
      userPhone: "required",
      // compound rule, правило-объект (блок)
      userEmail: {
        required: true,
        email: true
      }
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: jQuery.validator.format("Имя не короче {0} букв!")
      },
      userPhone: "Телефон обязателен",
      userEmail: {
        required: "Обязательно укажите email",
        email: "Укажите корректный email"
      }
    }
  
  });

  $('.control__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    rules: {
      // simple rule, converted to {required:true}, строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlenght: 15
      },
      userPhone: "required"
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: jQuery.validator.format("Имя не короче {0} букв!")
      },
      userPhone: "Телефон обязателен"
    }
  
  });

  $('.footer__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    rules: {
      // simple rule, converted to {required:true}, строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlenght: 15
      },
      userPhone: "required",
      // compound rule, правило-объект (блок)
      userQuestion: "required"
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: jQuery.validator.format("Имя не короче {0} букв!")
      },
      userPhone: "Телефон обязателен",
      userQuestion: "Заполните поле"
    }
  
  });


  //phone mask
  $('[type=tel]').mask('+7(000) 00-00-000', {placeholder: "+7(000) 00-00-000"});


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
            iconImageHref: './img/location.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });

    myMap.geoObjects
        .add(myPlacemark);
});

});


