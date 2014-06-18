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
var xianQuotes = [
	"Don't put me in your pack. It's stuffy in there. And it smells funny.",
	"Polish me! I'm dusty!",
	"Check out my teeth! They're shiny!",
	"Legolas! Boromir! Come quick! I ... Oh, wait. Never mind.",
	"You know what the best thing about being a skull is? I don't either.",
	"I have problems opening myself up to the unconditional love of others.",
	"Does this bone structure make me look fat?",
	"I hear that you can get a powerful spell in ... in ... Oh. I forgot.",
	"You should buy some nice skull wax. I'm starting to look dull.",
	"Let me go and I'll give you three wishes. Just kidding!",
	"Aaaaah!!! Aaaaahhh!!!! There's a spider inside me! Get it out! Get it out! It tickles!",
	"Check me out! I'm a talking skull!",
	"Bet you've never met a talking skull before. I'm high in calcium!",
	"Sometimes you have to kill to be kind.",
	"Mmmmm. I sure could use a deli sandwich. Mmmmm.",
	"I yearn for a gentle caress of a nice female skull.",
	"I could use a hat. A nice hat. With feathers or something. Why don't you buy me a hat? If you were the skull and I was the dopey sword guy walking all over the place, I'd buy you a hat.",
	"You ever long for the sweet embrace of death, held back from you for so, so terribly long? I ask only to make conversation."
];


console.log("establishing database connection...");
connection.connect();

connection.query('select * from oc_programs ocp join oc_program_details deets where ocp.program_ID = deets.program_ID AND MERCHANT_ID =10000481 LIMIT '+serverConfig.QUERY_LIMIT+';', function(err, rows, fields) {
	if (err) {
		console.error('WARNING - query failed.  Oh no!  The presentation is ruined!');
	} else {
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
console.log('server connection closed');

app.post('/newPromo', function(req, res){
	console.log('/newPromo called');
	var tempPromo = {
		mid: req.body.mid,
		name: req.body.name,
		desc: req.body.desc,
		cid: req.body.cid,
		goLive: req.body.goLive,
		endTime: req.body.endTime
	};
	
	if( tempPromo.mid == undefined || tempPromo.name == undefined ) {
		console.log('new promo failed');
		res.status(400).send("mid, pid, and name are required");
	} else {
		tempPromo.pid=localPromos.promoCount++;
		localPromos.promos.push(tempPromo);
		console.log(tempPromo);
		res.status(200).json(tempPromo);
	}
});

//this is really, really, incredibly lazily written. don't judge me.
app.put('/editPromo', function(req, res){
	var aCid = req.body.cid;

	if ( aCid != undefined ) {
		for( var i=0 ; i<localPromos.promos.length ; i++ ) {
			if (aCid == localPromos.promos[i].cid) {
				if (req.body.mid != undefined) { localPromos.promos[i].mid = req.body.mid; }
				if (req.body.name != undefined) { localPromos.promos[i].name = req.body.name; }
				if (req.body.desc != undefined) { localPromos.promos[i].desc = req.body.desc; }
				if (req.body.cid != undefined) { localPromos.promos[i].cid = req.body.cid; }
				if (req.body.goLive != undefined) { localPromos.promos[i].goLive = req.body.goLive; }
				if (req.body.endTime != undefined) { localPromos.promos[i].endTime = req.body.endTime; }
				res.status(200).send('promo '+aCid+' updated');
			}
		}
	}
	res.status(404).send('promotion not found'); //default
});

app.get('/getAllPromos', function(req, res){
        console.log("/getAllPromos called");
	
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(localPromos.promos);
});

app.get('/getOnePromo', function(req, res){
	console.log("/getOnePromo called");
	
	//PLACEHOLDER THING, TODO: GRAB REAL REQUEST PARAM
	var reqPid = 10000293; //req.param.pid;
	
	if ( localPromos.promos[reqPid] == undefined ) {
		res.status(400).send('promo with id '+reqPid+'not found');
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(localPromos.promos[reqPid]);
	}
});

app.get('/getPromoByMer', function(req, res){
	console.log('/getPromosByMer called');
	
	//PLACEHOLDER THING, TODO: GRAB REAL REQUEST PARAM
	var reqMid = 10000481; //req.param.mid;
	
	var result = localPromos.promos.filter(function( obj ) {
		return obj.mid == reqMid;
	});
	
	if ( result.length == 0 ) {
		res.status(400).send('promos for merchant'+reqMid+'not found');
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result);
	}
});

app.get('/getQuote', function(req, res){
	var quote = { quote: xianQuotes[Math.floor((Math.random() * xianQuotes.length) + 1)] };
	res.status(200).json(quote);
});

app.listen(5678);
console.log("Started server on port 5678");