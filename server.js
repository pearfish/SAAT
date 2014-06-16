var express = require('express'),
	mysql = require('mysql'),
	app = express();

app.configure(function(){
	app.use(express.json()); 
	app.use(express.urlencoded())
});
	
app.use(express.static(__dirname + "/static"));	
//this is a database no need to inquire deeper

var connection = mysql.createConnection({
	host     : 'localhost',
	port	 : 3306,
	database : 'oncardtest',
	user     : 'root',
	password : 'password'
});

//used to store promos locally
var localPromos = {
	timestamp: function(){
		return Date.now();
	},
	promos: [],
	findPromosByMerchant: function(mid){
		//return a filtered array of promo objects
	},
	promoCount: 3000000
};

//used for misc. constants
var serverConfig = {
	QUERY_LIMIT: 100
};

//xian skull has the best quotes 
var xianQuotes = {

	quotes: [
		//TODO: POPULATE
	]
};

console.log("establishing database connection...");
connection.connect();

console.log('connection established, doing query....');
connection.query('select * from oc_programs ocp join oc_program_details deets where ocp.program_ID = deets.program_ID AND MERCHANT_ID =10000481 LIMIT '+serverConfig.QUERY_LIMIT+';', function(err, rows, fields) {
	if (err) {
		console.error('WARNING - query failed.  Oh no!  The presentation is ruined!');
	} else {
		console.log('query successful, creating fake db...');
		
		for( i=0 ; i < rows.length ; i++ ){
			//map the desired columns to temp object
			var tempPromo = {
				mid: rows[i].MERCHANT_ID,
				pid: rows[i].PROGRAM_ID,
				name: rows[i].PROGRAM_NAME,
				desc: rows[i].PROGRAM_SHORT_DESC,
				cid: rows[i].CREATIVE_ID,
				goLive: rows[i].GO_LIVE_DATE,
				endTime: rows[i].END_TIME
			}
			localPromos.promos.push(tempPromo);
		}
		console.log('fake db created, size='+localPromos.promos.length);
	}
});

connection.end();
console.log('server connection murdered in its prime');

app.post('/test', function(req, res, next){
    res.status(200).send("peachy");
});

app.get('/promos', function(req, res, next){
	console.log("/promos called");
	
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(localPromos.promos);
});

app.get('/specificPromos/:mid', function(req, res, next){
	console.log("/specificPromos called");
	res.status(400).send('TODO');
});


app.post('/newPromo', function(req, res, next){
	console.log('/newPromo added');
	console.log(req);
	var tempPromo = {
		mid: req.body.mid,
		name: req.body.name,
		desc: req.body.desc,
		cid: req.body.cid,
		goLive: req.body.goLive,
		endTime: req.body.endTime
	};
	
	console.log(tempPromo);
	
	if( tempPromo.mid == undefined || tempPromo.name == undefined ) {
		console.log('new promo failed');
		res.status(400).send("mid, pid, and name are required");
	} else {
		tempPromo.pid=promoCount++;
		localPromos.promos.push(tempPromo);
		console.log("new promotion added");
		res.status(200).send('promotion added');
	}
});

app.listen(5678);
console.log("Started server on port 5678");