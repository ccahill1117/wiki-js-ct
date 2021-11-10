readme !

don't forget node buildpacks (why did i type this?)

* logging into heroku without annoying SSO

$ heroku login i

$ node server to start

* backing up

$ pg_dump -Fc --no-acl --no-owner ct_workinstruction > ct_workinstruction.sql

- then upload to AWS, get URL , then...

$ heroku pg:backups:restore 'https://hereyougofriend.s3.us-west-2.amazonaws.com/ct_workinstruction.sql' DATABASE_URL

* Current Issues
- attachment greater than 5MB

- $chmod 777 data
