
var express = require('express'),
    port = '8080',
    app = express();

app.set('view engine', 'jade');
app.set('views', 'views');
app.engine('jade', require('jade').__express);

app.get('/stooges/:name', function(req, res){
    var name = req.params.name;
    switch(name.toUpperCase()){
        case '洪金宝':
        case '成龙'  :
        case '周星驰':
            res.render('stooges', {
                stooge    : name,
                isFavorite: true
            });
            break;
        default:
            res.render('stooges');
    }
});

app.get('/*', function(req, res){
    res.render('index');
});

app.listen(port);

