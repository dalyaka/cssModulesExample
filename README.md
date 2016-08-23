CssModules помогают решить проблемы нейминга стилей на проекте, так как формируют уникальные имена классов,
которые могут включать в себя "имя класса + путь до файла со стилями + хеш"
(во время разработки (!), для продакшена достаточно одного хеша).
Соответственно, не придется решать проблему конфликтов имен классов путем ручного именования(БЭМ)

Проблемы, которые могут возникнуть во время внедрения CssModules на Дневник.

1. наличие препроцессора
2. наличие большой кодовой базы
3. формирование динамических имен классов


======

- наличие препроцессора никак не мешает, так как файлы все равно будут компилироваться в css

- чтобы разграничить старые стили и cssModules можно использовать паттерн именования файлов, а именно ".module.styl" для модулей.
Тогда в конфиге для вебпака надо будет добавить два разных лоудера, которые будут применятся в заивисмости от названия файла.
".module.styl" будут храниться в бандле js (предлагаю хранить именно тут, так как хранить в css не имеет особо смысла), а просто ".styl" - будут собираться c помощью ExtractTextPlugin в единый css файл.
Пример: 
```js
    {
      test: (path) => { path.endsWith('.module.styl') },
      loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=2&sourceMap!postcss-loader!stylus-loader',
    },
    {
      test: (path) => { !path.endsWith('.module.styl') && path.endsWith('.styl') },
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'stylus-loader']),
    }
```

- Для того, чтобы использовать имена классов из cssModules достаточно импортировать необходимый файл со стилями,
который будет являться объектом, где ключом будет имя класса, а значением - динамически сгенерированное имя класса.
Так как имя класса - строка, проблем никаких нет.
Для удобства формирования динамических имен классов можно использовать утилиту classnames, либо воспользоваться
функцией composes из cssModules, которая импортирует стили одного класса в другой. Пример:

```js
const className = classnames('example-of-checkbox', styles.checkbox, {
      [styles.checked]: this.state.checked,
      [this.props.additionalClass]: this.props.additionalClass,
    });


.checked
  composes: button from "./Common.module.styl"
```


Пример результатирующего имени класса: example-of-checkbox checkbox__src-common-Checkbox-module__FAoB0 additionalClass__src-common-Checkbox-module__3abSx

