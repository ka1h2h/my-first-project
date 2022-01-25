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
  const container = document.querySelector(selector);

  fetchProductsAndPromotion().then((data) => {
    const cardInfo = data.products.map(function (products, promotion) {
      return createCardLayout(products, data.promotion);
    });

    const arCard = cardInfo.join();
    container.innerHTML = arCard;
  });
}

function createCardLayout(products, promotion) {
  let giftValue = products.packsAmount / promotion.everyProductsAmount;
  let compliment;
  if (giftValue == 5) {
    compliment = promotion.giftMaxValueComplimentText;
  } else {
    giftValue != 5;
    compliment = "";
  }
  if (giftValue < 1) {
    giftValue = "";
  }
  return `
      <div class="card" id="55">
        <div class="frame">
          <div class="frameBorder"></div>
            <div class="content">
              <div class="notice" id="def">Сказочное заморское яство</div>
              <div class="hover" id="hov">Котэ не одобряет?</div>

              <div class="title">Нямушка</div>
              <div class="taste" id="with">${products.taste}</div>
              <div class="portion">
              <strong id="amount">${products.packsAmount}</strong> порций<br />
                   ${giftValue} мышь в подарок <br />
                   <strong id="50">${compliment}</strong>
                  </div>
                </div>

            <div class="weight-circle">
              <div class="weight" id=kg>${
                products.packWeight * products.packsAmount
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

const cont = document.querySelector(".container");

const cardClick = cont.addEventListener("click", function (event) {
  let click = event.target.className === "frame";
  if (click) return event.target.classList.toggle("selected");
  event.target.classList.remove("selected");
});

// cont.addEventListener("mouseover", function (event) {
//   let over = event.target.className === "frame";
//   if (over) event.target.classList.toggle("selected .frame");
// });

ProductsCards("[data-products]");
// const cardClick = cont.addEventListener("click", function (event) {
//   let click = event.target.className === "frame";
//   if (click) return event.target.classList.toggle("selected");
//   event.target.classList.remove("selected");
// });
