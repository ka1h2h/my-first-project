## Заметки

способ создания уголка уже не так плох, но погляди что будет, если мы переместим карточку в другой контейнер, кусок бэкграунда будет портить нам жизнь

кстати, если посмотреть основой макет мы увидим, что есть еще 4й блок с тексом, неплохо бы его тоже заверстать

------------------------------
1. .content - имеет свойтво white-space: nowrap, не вижу смысла в этом свойстве 
2. .frame назначено свойство padding-right: 61px; в нем нет смысла, оно уже ограничивает текстовые элементы и они выпадают за пределы границ элемента
3. .taste - остался margin 90
4. .weight - не должен быть абсолютным элементом, нет в этом смысла и слишком сложно, убери ему line heigtn, позиционирование, родителю задай центрирование текста и внутрении отсупы
5. вынеси <span>кг</span> за пределы .weight и убери ему позиционирование, .weight и так является блочным элементом так что кг переместится под него
6. многие классы получили одно и тоже свойстов  font-family: Trebuchet MS; возможно его стоит назначить .card тк это родительский элемент и от него отнаследуют все вложенные
