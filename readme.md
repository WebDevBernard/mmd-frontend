## About

- Front-end for [MakeMyDay](https://github.com/WebDevBernard/MakeMyDay) app

## How to Reset Postgres Backend

- git pull https://git.heroku.com/makemydaydemo.git
- heroku login // N!
- heroku pg:psql DATABASE_URL
- \i db/schema/users.sql
- \i db/schema/projects.sql
- \i db/schema/tasks.sql
- \i db/schema/messages.sql
- \i db/seeds.sql
