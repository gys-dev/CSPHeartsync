var app = require('express')(),
    bodyParser = require('body-parser'),
    http = require('http'),
    bot = require('./modules/bot');

server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send("It work!!");
})

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'verify_token') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Oops :< Wrong token. So sorry <3');
});

app.post('/webhook', function (req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        log.info(entries);
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                if (message.message.text) {
                    bot.reply(senderId,message.message.text);
                }
            }
        }
    }

    res.status(200).send("OK");
});


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Express server listening at %s:%d ", app.get('ip'), app.get('port'));
});