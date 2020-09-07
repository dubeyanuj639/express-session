# express-session
# Link - https://www.tsmean.com/articles/authentication/express-session-angular/
// But Express session only manage API session (Not click/scroll etc..)
To manage express session

Managing sessions may seem a bit daunting at first. But taking first steps isn't actually that hard. When using Express based on Node.js in the backend, most things are already figured out for you. Still, there a few pitfalls you might want to avoid. This tutorial helps you getting started on the right foot.

First of all, let's see a very simple example application using express and sessions. There's a quite simple one on Tutorialspoint, which looks somewhat like this:

var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({secret: "Shh, its a secret!"}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(3000);
    

This is everything you need for working sessions! You'll also notice, that when you open this once in Chrome and once in Firefox, that express-session creates different sessions for different clients.

How does that work? Express generates a cookie, which is sent to the browser together with the response. The browser then attaches this cookie to subsequent requests, which lets express identify a client.
Getting things to work with Angular

Getting things to work with Angular requires an extra step, to how you'd usually send a request. You'll need to have the {withCredentials: true} option present on your requests! If you don't attach this, the cookie won't be sent. So resulting code might look like this:

getLogin() {
    this.http.get(environment.apiUrl + '/login', {
      withCredentials: true  // <=========== important!
    }).subscribe((resp: any) => {
      this.loggedIn.next(resp.loggedIn);
    }, (errorResp) => {
      this.toastr.error('Oops, something went wrong getting the logged in status')
    })
}

Another thing you'll need to think of, is CORS (Cross Origin Resource Sharing). Since your backend and frontend will live at different domains / different ports, you'll need to enable CORS in the backend. This can easily be achieved with Express like this:

const cors = require('cors');
      const app = express();
app.use(cors({origin: [
  "http://localhost:4736"
], credentials: true}));

Now everything should be working as expected. 
