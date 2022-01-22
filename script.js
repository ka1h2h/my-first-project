/*
 * Задача состоит в том, чтобы получит данные с API
 * и зарендерить их в наш html
 *
 * Данные для отрисовки можно получить по ссылке https://hostave.net/demo/
 *
 * 1. Данные нужно получить по ссылке, она отдаст их в формате JSON,  стоит разобраться
 * с возможными JS Browser API ( XMLHttpRequest и Fetch API ) и что за птица такая этот JSON
 * 2. Из полученных данных нужно сгенерировать html и вставить в нашу страницу
 * Для примера я уже закинул html в переменную exampleCardHtml, его можно взять за основу
 * и вставить данные.
 * Вставлять будем через Template Literals(https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals)
 * 3. В данных которые будут получены от сервера содержится ключ promotion
 * в котором описаны условия акции, их нужно рассчитать каждому продукту
 * 4. Добавить возможность при клике на продукт приводить его в "выбранное" состояние в соответствии с макетом figma
 * 5. У продукта есть ключ isActive и при его false значении нужно привести продукт в "заблокированное" состояние
 * в в соответствии с макетом figma
 *
 * P.S.
 * Внимательно просмотри данные продуктов https://hostave.net/demo/, какие-то из них прийдется вычислить для вставки в html
 * */

function fetchProductsAndPromotion() {
  return fetch("https://hostave.net/demo/").then((res) => res.json());
}

function ProductsCards(selector) {
  // NOTICE 1: я специально передавал сюда строку селектора, зачем ты поменял выборку по 55 id
  const container = document.getElementById("55");

  fetchProductsAndPromotion().then((data) => {

    const cardInfo = data.products.map(function (cards) {
      // NOTICE 2: пора и promotion высчитать
      return createCardLayout(cards, data.promotion);
    });

    const arCard = cardInfo.join();
    container.innerHTML = arCard;
    // NOTICE 3: вынеси createCardLayout на один уроверь с функцией ProductsCards
    // ей не нужно быть вложенной в ProductsCards, почитай подробнее про области видимости функций
    function createCardLayout(cards, promotion) {
      // NOTICE 4: посчитай promotion и выведи в html количество мышей и надпись при самой большом значении скидки
      // NOTICE 5: убери id аттрибуты, они должны быть уникальны, а сейчас ты создаешь по 3 штуки каждого
      return `
            <div class="card" id="123">
              <div class="frame" id="frameSelected">
                <div class="frameBorder"></div>
                <div class="content">
                  <div class="notice" id="def">Сказочное заморское яство</div>
                  <div class="hover" id="hov">Котэ не одобряет?</div>

                  <div class="title">Нямушка</div>
                  <div class="taste" id="with">${cards.taste}</div>
                  <div class="portion">
                    <strong id="amount">${
                      cards.packsAmount
                    }</strong> порций<br />
                    мышь в подарок
                  </div>
                </div>

                <div class="weight-circle">
                  <div class="weight" id=kg>${
                    cards.packWeight * cards.packsAmount
                  }</div>
                  <span>кг</span>
                </div>
              </div>

              <div class="bottom-text">
                Чего сидишь? Порадуй котэ, <a href="#">купи.</a>
              </div>
              <div class="bottom-selected">Печень утки разварная с артишоками.</div>
            </div>
          </div>
          `;
    }
    // NOTICE 6: ок, в манипуляциях с элементами ты разобрался, но в реальных проектах так не делают
    // теперь вместо выборки этих 10 элементов будем работать через добавление/удаление класса,
    // при клике будем добавлять к карточке класс .selected ( есть такой метод API Element.classList, почитай )
    // в файл style.css опишем как добавление этого класса повлияет на другие селекторы,
    // например .selected .frame { border: 4px solid rgb(217, 22, 103); } и так же другие элементы которые визуально
    // затрагивает состояние selected
    let selectedHover = document.querySelector(".hover");
    let portion = document.getElementById("amount");
    let weight = document.getElementById("weight");
    let tasteOne = document.getElementById("with");
    let def = document.querySelector(".notice");
    let defaultSelect = document.querySelector(".frame");
    let weightColor = document.querySelector(".weight-circle");
    let bottomSelected = document.querySelector(".bottom-selected");
    let bottomDefault = document.querySelector(".bottom-text");
    let frameBorder = document.querySelector(".frameBorder");

    // const cardSelectTwo = document.querySelectorAll("#123")[1].innerHTML;
    // console.log(cardSelectTwo);

    // NOTICE 7: тут ты повесил событие обработки клика только на один элемент,
    // а нам нужно обрабатывать все, для этого есть очень полезный подход - делегирование событий
    // https://learn.javascript.ru/event-delegation
    // NOTICE 8: мы должны написать такой код, чтобы каждая карточка была кликабельна
    // Т.е, при клике на карточку мы визуально подсвечиваем ее как выбранную, при повторном клике на выбранную карточку
    // мы убираем ей выбранное состояние
    const cardSelectOne = document.querySelector(".card");
    console.log(cardSelectOne);
    cardSelectOne.addEventListener("click", function () {
      selectedHover.style.display = "inline";
      def.style.display = "none";
      defaultSelect.style.border = "4px solid #D91667";
      weightColor.style.background = "#D91667";
      bottomDefault.style.display = "none";
      bottomSelected.style.display = "block";
      frameBorder.style.backgroundColor = "#D91667";
      // NOTICE 9: эти события нужно описать отдельными addEventListener на mouseover и mouseout
      defaultSelect.onmouseover = logMouseOver;
      defaultSelect.onmouseout = logMouseOut;
      function logMouseOver(cardSelectOne) {
        selectedHover.style.display = "block";
        def.style.display = "none";
      }

      function logMouseOut(cardSelectOne) {
        def.style.display = "block";
        selectedHover.style.display = "none";
      }
    });
  });
}

// let selectedHover = document.querySelector(".hover");
// let portion = document.getElementById("amount");
// let weight = document.getElementById("weight");
// let tasteOne = document.getElementById("with");
// let def = document.querySelector(".notice");
// let defaultSelect = document.querySelector(".frame");
// let weightColor = document.querySelector(".weight-circle");
// let bottomSelected = document.querySelector(".bottom-selected");
// let bottomDefault = document.querySelector(".bottom-text");
// let frameBorder = document.querySelector(".frameBorder");

// // let upperoBorder =  window.getComputedStyle(defaultSelect, ":before")

// let cardSelect = document.querySelector(".card");
// cardInfo.addEventListener("click", function () {
//   selectedHover.style.display = "inline";
//   def.style.display = "none";
//   defaultSelect.style.border = "4px solid #D91667";
//   /* достучаться до псевдоселектора */
//   weightColor.style.background = "#D91667";
//   bottomDefault.style.display = "none";
//   bottomSelected.style.display = "block";
//   frameBorder.style.backgroundColor = "#D91667";

//   defaultSelect.onmouseover = logMouseOver;
//   defaultSelect.onmouseout = logMouseOut;

//   function logMouseOver(cardSelect) {
//     hov.style.display = "block";
//     def.style.display = "none";
//   }

//   function logMouseOut(cardSelect) {
//     def.style.display = "block";
//     hov.style.display = "none";
//   }
// });
