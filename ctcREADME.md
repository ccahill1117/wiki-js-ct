readme !


* logging into heroku without annoying SSO

$ heroku login i

FOR DEV :
$ yarn run dev (this also runs migrations)

$ node server to start

* backing up

$ pg_dump -Fc --no-acl --no-owner ct_workinstruction > ct_workinstruction.sql

- then upload to AWS, get URL , then...

$ heroku pg:backups:restore 'https://hereyougofriend.s3.us-west-2.amazonaws.com/ct_workinstruction.sql' DATABASE_URL

* creating migrations
https://devhints.io/knex
$ yarn run knex migrate:make migration_name

* Current Issues
- attachment greater than 5MB

- $chmod 777 data
