
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("./startups.json", "utf8")
.then(function (startups) {
    var sups = JSON.parse(JSON.stringify(startups));
    console.log(typeof sups)



}).catch(SyntaxError, function (e) {
    console.error("file contains invalid json");
}).catch(Promise.OperationalError, function (e) {
    console.error("unable to read file, because: ", e.message);
});