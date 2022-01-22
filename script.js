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
  const container = document.getElementById("55");

  // ProductsCards("[data-products]");

  fetchProductsAndPromotion().then((data) => {
    console.log(data.products);

    const cardInfo = data.products.map(function (cards) {
      return createCardLayout(cards);
    });

    const arCard = cardInfo.join();
    container.innerHTML = arCard;

    function createCardLayout(cards) {
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
