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

    const arCard = cardInfo.join("");
    container.innerHTML = arCard;
  });
}

function createCardLayout(products, promotion) {
  let giftValue = products.packsAmount / promotion.everyProductsAmount;
  let compliment;
  let isActive = products.isActive;
  // нестрогое сравнение лучше не использовать https://learn.javascript.ru/comparison#strogoe-sravnenie
  if (giftValue == 5) {
    compliment = promotion.giftMaxValueComplimentText;
  } else {
    // != это оператор сравнения ты ничего не происходит и значит это просто лишний код
    giftValue != 5;
    // тут можно не присваивать пустую строку, она все равно будет пустой
    compliment = "";
  }
  if (giftValue < 1) {
    giftValue = "";
  }
  // функция createCardLayout вызывается в цикле обхода products, получается ты создал 3 обработчика
  // которые делаю одно и то же
  cont.addEventListener("click", function (event) {
    let td = event.target.closest(".card");
    if (!td) return;
    td.classList.toggle("selected");
  });

  return `
  
      <div class="card ${isActive ? " " : "disabled"}">
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
              <div class="bottom-selected">${products.description}</div>
              <div class="bottom-disabled">Печалька, ${
                products.taste
              } закончился</div>
            </div>
            </div>
            </div>
          </div>
          `;
}

const cont = document.querySelector(".container");

ProductsCards("[data-products]");
