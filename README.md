что я сделал:

1. у .card убрал свойства margin-top/left

2. Размеры width и height у .card оставил потому что если я убираю высоту у .сard,
   то border и background-color принимают значение селектора .content: height,
   что по сути не меняет значения, где будет находится height. Однако height я тоже внес
   в .content.

3. Кота я положил в .content потому, что в селекторе .card я применил linear-gradient,
   что не позволяет нанести картинку поверх градиента (хотя может так и можно, но я не нашел)

4. Элементу .content я передал значение 500px, что в итоге не выводит наш .bottom-text
   за границы .content, однако текст все также остался за границей родителя .card.

5. .content свойство margin-top: 20px я убрал и оцентровал текст text-align: center, однако
   мне все равно пришлось к .taste "с фуа-гра" применить margin-right: 90px. Не знаю,
   на сколько это законно.

6. .notice width: 205 px - убрал.

7. line-height почитал, понял, что оно там нигде не нужно и убрал тоже.

8. weight-circle ты написал можно описать позиционирвание от right и bottom, но если ты имеешь
   в виду обычные right: ..px, то чем это отличается от left. в right у меня таким образом
   получились отрицательные значения. Или может ты имел в виду какое-то другое свойство под словом
   "позиционирование"?!

9. По поводу <br /> все понял, сделал вроде как надо.


## Ответы

------------------------------
**я немного поменял разметку и стили чтобы добавить примеров**

Не используй плз киррилицу для названия файлов, файл отчет.txt я вижу в системе как `\320\276\321\202\321\207\320\265\321\202.txt`

я сделалал ситуацию когда проблема с определением размеров элемента может причинить вред другим элементам ( нижний текст сейчас провалился внутрь соседнего .example-container )

дополнительно оставил примеры работы с градиентом 

1. Ок
2. Сейчас в стилях конфликт, из-за того что и .card и .content имеют высоту возникают проблемы, для родилей элемент высота .card будет восприниматься как 480, но фактически из него вываливается содержимое на 500, открой отладчик браузера и проинспектируй размеры элементов
3. Заметил, что ты неверно экспортировал кота из фигмы, тебе нужно кликнуть на картинку и в правом сайдбаре
   на вкладке Design в самом низу будет Export. Можно комбинировать background-image и градиенты, эта тема требует изучения
4. Лучше будет назначить 480, элемнет .bottom-text должен быть дочерним к .card и убери у него отступ в 290. У .card не задавай значение полю height, а так же у него не должно быть других свойств типа border, background
5. margin-right: 90px - это ненадежно, если вместо 'с фуа-гра' будет более длинный текст верстка поползет. Сделать можно проще, убрать отступ в 90 и поменять у content text-align: center на padding-left со значением например 40px
6. ок
7. ок
8. у тебя изначально неверно проставлены свойства. .content должен иметь position: relative, т.к ты относительно этого элемента будешь позиционировать кружок. .weight-circle должен иметь postition: absolute как позиционируемые абсолютно элемента .content (у которого relative). При выборе свойтв позиционирования рассматривам ближайшие стовроны, для нас это right и bottom. Если в нашем кейсе оставить на top и left мы можем получить ситуацию когда ширина нашей карточки может измениться и наш элемент может оказаться не в том место где рассчитано 
9. ок

