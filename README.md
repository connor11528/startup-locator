startup-locator
=====

> Locate startups
> Accept payments
> deploy to production env
> show favorited startups
> search and filter

### Import to MongoDB

Load the data from angellist with

```
$ cd server
$ node startupsToCSV.js
```

Then load that into MongoDB with the mongoimport command

```
$ cd ..
$ mongoimport -d startup-locator -c startups --type csv --file server/SFstartups.csv --headerline
```

Clear browser's localstorage: `window.localStorage.clear();`

#### Getting started
```
$ git clone <this_repo>
$ npm install
$ nodemon server
```