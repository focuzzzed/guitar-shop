# Потрачено времени на проект: 37 часов 56 минут

# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`.

## Запуск проекта

Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз **Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`.

### Установите зависимости

Выполните команду

```bash
npm install
```

### Настройте переменные окружения

В корне проекта находится файл `.env.example`. Скопируйте его содержимое в файл `.env` и настройте значения переменных.

#### Список переменных окружения

##### База данных PostgreSQL

- `POSTGRES_USER=admin` - Имя пользователя для подключения к базе данных PostgreSQL.
- `POSTGRES_PASSWORD=test` - Пароль для подключения к базе данных PostgreSQL.
- `POSTGRES_DB=guitar_shop` - Имя базы данных в PostgreSQL.

##### PgAdmin

- `PGADMIN_DEFAULT_EMAIL=user@local.com` - E-mail адрес для входа в PgAdmin.
- `PGADMIN_DEFAULT_PASSWORD=test` - Пароль для входа в PgAdmin.

##### JWT

- `JWT_ACCESS_SECRET=supersecret1212` - Секретный ключ для создания JWT токенов.
- `JWT_ACCESS_EXPIRES_IN=30m` - Время жизни JWT токена.
- `JWT_ALGORITHM=HS256` - Алгоритм, используемый для создания JWT токенов.

##### Сервер приложения

- `PORT=3333` - Порт, на котором будет запущен сервер приложения.

##### Почта

- `MAIL_SMTP_HOST=localhost` - Имя хоста SMTP-сервера для отправки электронной почты.
- `MAIL_SMTP_PORT=8025` - Порт SMTP-сервера для отправки электронной почты.
- `MAIL_USER_NAME=admin` - Имя пользователя для SMTP-сервера.
- `MAIL_USER_PASSWORD=test` - Пароль для SMTP-сервера.
- `MAIL_FROM=guitar-shop@gmail.local` - E-mail адрес отправителя для электронной почты.

##### Загрузка файлов

- `UPLOAD_DIRECTORY=D:\Projects\guitar-shop\src\shared\modules\products\file\uploads` - Путь к директории, в которую будут загружаться файлы.

### Разверните базу данных PostgreSQL

В проекте используется база данных **PostgreSQL** версии 14.

Если вы используете Docker, воспользуйтесь файлом `docker-compose.yml`, расположенным в корне проекта, для быстрого разворачивания базы данных.

Пример разворачивания:

```bash
docker compose \
--file ./docker-compose.yml \
--env-file ./app.env \
--project-name "guitar-shop" \
up \
-d
```

### Наполните базу данных

Сгенерируйте нужное количество товаров. Для этого необходимо указать их количество и строку подключения:

```bash
npm run ./src/main.cli.ts -- --generate 50 postgres://admin:test@localhost:5432/guitar_shop                                                                                                                                                                                                                                       
```

### Запустите проект

Выполните команду

```bash
npm start
```

## Сценарии

В `package.json` предопределены несколько сценариев.

### Команды для работы с Nest.js
- `start` - Компилирует проект в папку dist и запускает его.
- `start:dev` - Запускает приложение в режиме разработки с возможностью автоматического перезапуска при изменении файлов.
- `start:debug` - Запускает приложение в режиме отладки с возможностью автоматического перезапуска при изменении файлов.
- `start:prod` - Запускает скомпилированное приложение в продакшене.
- `lint` - Проверяет код на соответствие правилам линтинга и пытается автоматически исправить ошибки, если это возможно.
- `ts` - Запускает TypeScript-файлы с помощью ts-node.

### Команды для работы с базой данных

- `db:generate` - Генерирует клиент Prisma на основе схемы базы данных.
- `db:reset` - Откатывает все миграции в базе данных.
- `db:lint` - Проверяет схему базы данных на наличие ошибок.
- `db:migrate` - Применяет новые миграции к базе данных.

## Примеры использования команд

### Запустить сервер в режиме разработки

```bash
npm run start:dev
```

### Проверить линтером

```bash
npm run lint
```

### Запустить ts-модуль

```bash
npm run ts ./path/to/your/file.ts
```

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.
