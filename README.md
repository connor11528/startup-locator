startup-locator
=====

> Add login/register
> Favorite companies
> Locate startups
> Accept payments

### Import to MongoDB

`$ mongoimport -d startup-locator -c startups --type csv --file server/SFstartups.csv --headerline`

#### Getting started
```
$ git clone <this_repo>
$ npm install
$ nodemon server
```