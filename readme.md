```
yarn add moment @mui/lab formik yup yup-locales usehooks-ts formik-mui node-cache material-ui-confirm material-react-table @mui/x-date-pickers react-toastify @reduxjs/toolkit slugify react-dropzone jodit-react
```

### Не пушить код в подмодуль

- код, который на ваш взгляд нужно перенести в подмодуль следует размещать в папке `/shared` от корня проекта
- код, который на ваш взгляд нужно исправить в подмодуле следует размещать по адресу `/shared/core`. (копипастится файл из `/core` с сохранением его пути, и вносятся исправления (желательно, без изменения форматирования файла)
- по запросу или после проверки временем код отсюда будет перенесён техлидом в core
