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

#### Deploy to the Herokooz
```
$ heroku create showjunkie
$ heroku config:set NODE_ENV=production
$ heroku addons:create mongolab:sandbox 
$ heroku config | grep MONGOLAB_URI # Add this to config/env.js['production']['db']
$ heroku config:set MONGOLAB_URI=mongodb://your_uri_string
$ git push heroku master
$ heroku ps:scale web=1
```
