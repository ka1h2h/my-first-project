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

const exampleCardHtml = `
    <div class="card">
        <div class="frame">
            <div class="content">
                <div class="notice">Сказочное заморское яство</div>
                <div class="title">Нямушка</div>
                <div class="taste">с фуа-гра</div>
                <div class="portion"><strong>10</strong> порций<br/> мышь в подарок</div>
            </div>


            <div class="weight-circle">
                <div class="weight">0,5</div>
                <span>кг</span>
            </div>
        </div>


        <div class="bottom-text">
            Чего сидишь? Порадуй котэ, <a href="#">купи.</a>
        </div>
    </div>
`;


function ProductsCards(selector) {
  console.log(`I'll render products to ${selector} element`)
}

ProductsCards('[data-products]');

