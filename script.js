function fetchProductsAndPromotion() {
  return fetch("https://hostave.net/demo/").then((res) => res.json());
}

function ProductsCards(selector) {
  const container = document.querySelector(selector);

  fetchProductsAndPromotion().then((data) => {
    const cardInfo = data.products.map(function (products) {
      return createCardLayout(products, data.promotion);
    });

    const arCard = cardInfo.join("");
    container.innerHTML = arCard;
  });
}

function createCardLayout(products, promotion) {
  let giftValue = products.packsAmount / promotion.everyProductsAmount;
  let compliment = "";
  // isActive - эта переменная не изменяется и ее лучше объявить через ключевое слово const
  // но вообще можно эту переменную и не создавать
  let isActive = products.isActive;

  if (giftValue === 5) {
    compliment = promotion.giftMaxValueComplimentText;
  }

  if (giftValue < 1) {
    giftValue = "";
  }

  cont.addEventListener("click", function (event) {
    let targetDisabled = event.target.closest(".card.disabled");
    let targetEnabled = event.target.closest(".card");
    if (targetDisabled) return;
    if (!targetDisabled) return targetEnabled.classList.toggle("selected");
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
