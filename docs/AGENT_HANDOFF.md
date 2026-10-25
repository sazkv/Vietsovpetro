# Передача проекта Vietsovpetro

Независимая концепция корпоративного сайта; она не является официальным ресурсом. Основной источник фактов — https://www.vietsov.com.vn/.

## Архитектура

- Next.js 15, React 19, TypeScript, статический экспорт для GitHub Pages.
- VI/RU/EN через `next-intl`, словари интерфейса в `src/messages/`.
- `src/data/original-pages.json`: полный сохранённый HTML публичных страниц и источник каждого маршрута.
- `src/data/home-content.json`: оригинальные каталоги главных страниц.
- `src/lib/site-map.ts`: ранний реестр исходных разделов и корпоративных сервисов.
- `src/data/page-labels.json`: подписи вместо служебных заголовков исходного HTML.
- `src/data/menu.json` и `public/search-index-*.json`: компактные индексы навигации и поиска; обновлять после изменения каталога страниц.
- `src/components/source-*`: навигация, шаблоны разделов и материалов, футер.
- `src/app/globals.css`: централизованные токены и адаптивная дизайн-система.

## Проверки

```bash
npm run check:structure
npx tsc --noEmit
NEXT_PUBLIC_BASE_PATH=/Vietsovpetro npm run build
```

Проверять публичные маршруты, поиск, раскрытие меню, изображение в первом экране и отсутствие горизонтального скролла на мобильном и планшете. Содержательные ограничения описаны в `docs/CONTENT_INVENTORY.md`.
