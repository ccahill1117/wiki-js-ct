## readme !

### getting app started on your machine
- $ CREATE DATABASE ct_workinstruction;
- db port/host/db_name in config.yml (normally .gitignore'd)
- $ yarn run dev

### logging into heroku without annoying SSO

$ heroku login i

### backing up (terminal)

- $ pg_dump -Fc --no-acl --no-owner ct_workinstruction > ct_workinstruction.sql

- then upload to AWS, get URL , then...

- $ heroku pg:backups:restore 'https://hereyougofriend.s3.us-west-2.amazonaws.com/ct_workinstruction.sql' DATABASE_URL

### creating migrations
- https://devhints.io/knex
- $ yarn run knex migrate:make migration_name

### Current Issues
- attachment greater than 5MB

### Next steps
- persisted state for in flight procedures
- increased gql for procedures

### ctc notes
- yarn run dev also runs pending migrations?
- insomnia GQL


### work completed so far
- scripting from one note
- creating basic table structure for procedures / procedureSteps
- beginning work on graphQL to utilize built in auth

### 11/24
- buddy system for procedures
- tool ID for procedures
- ability to add numerical values
- shopping cart for multiple procedures (to be completed in one go)
- how to send completed checklist to SharePoint
- full text search (confirm this)

