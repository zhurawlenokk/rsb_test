## Запуск
* `npm i` - установка модулей
* `gulp` - запуск сборщика

#### Основной файл стилей - `_style.scss`.
- В файле `main.scss` подключаются и собираются все файлы. При необходимости работы с чистым CSS, нужно заменить все содержимое этого файла на CSS
- В файле `_base.scss` базовые стили

#### Функция `em(Npx, arg)`
В файле `_variables.scss` хранятся переменные, функция `em()` рассчитывает значение относительно переменной во втором аргументе, это же значение должно являться основным размером шрифта.
По умолчанию:
```
$fs-l: 16px;
$fs-m: 15px;
$fs-s: 14px;
$fs-xs: 13px;
```
Пример: `font-size: em(20px, $fs-l)` - вернет 1.25em
