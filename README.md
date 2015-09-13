startup-locator
=====

> Locate startups
> Accept payments
> deploy to production env
> show favorited startups

### Import to MongoDB

`$ mongoimport -d startup-locator -c startups --type csv --file server/SFstartups.csv --headerline`

#### Getting started
```
$ git clone <this_repo>
$ npm install
$ nodemon server
```