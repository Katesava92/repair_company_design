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

  $("#menu, #menuFooter").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
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
      userName: {  // compound rule, правило-объект (блок)
        required: true,
        rangelength: [2, 15]
      },
      userPhone: {
        required: true,
        minlength:17
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
        minlength:17
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
        minlength:17
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


  //phone mask
  $('[type=tel]').mask('+7(000) 00-00-000');

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '434',
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

  YaMapsShown = false;

  $(window).scroll(function() {
    if (!YaMapsShown){
     if($(window).scrollTop() + $(window).height() > $(document).height() - 700) {      
      showYaMaps();
      YaMapsShown = true;
     }
    }
 });

 function showYaMaps(){
  var script   = document.createElement("script");
  script.type  = "text/javascript";
  script.src   = "js/map.js";
  document.getElementById("map").appendChild(script);
 };



  







});


