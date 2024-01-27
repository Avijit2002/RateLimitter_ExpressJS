
const express = require('express');
const app = express();

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.use((req,res,next)=>{
    const username = req.headers["user-id"];

    if(numberOfRequestsForUser[username]){
      numberOfRequestsForUser[username]++;
      if(numberOfRequestsForUser[username]>5) res.status(404).send("Not Allowed")
      else next()
    }
    else{
      numberOfRequestsForUser[username] = 1;
      next();
    }
})

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000)

module.exports = app;