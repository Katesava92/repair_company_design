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

  /*$(document).on('click', function(window) { //при нажатии вне окна закрывается оно
      if (window.target == modal) {
        modal.toggleClass('modal--visible');
    }
      
  });*/

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


});


