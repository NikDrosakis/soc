function l(l){typeof l=="object" ? console.table(l) : console.log(l);}
const WebSocket=require('ws'),g=require('./gaia'),https=require('https'),zlib=require('zlib'),path=require('path'),
fs=require('fs'),redis = require("redis"),red = redis.createClient({host:'0.0.0.0', port:6379, password: "n130177!",detect_buffer:true,db:2 });
// Creating a new websocket server
 var processRequest = function(req,res){res.writeHead(200);res.end("All glory to WebSockets!\n");};
const privateKey = fs.readFileSync('/etc/letsencrypt/live/parapera.org/privkey.pem','utf8'),certificate = fs.readFileSync( '/etc/letsencrypt/live/parapera.org/fullchain.pem','utf8'),credentials = {key: privateKey, cert: certificate};
const app=https.createServer(credentials,processRequest).listen(3003, function(){l('listening on 3003')}).on('error', function(err) {exec('/var/www/parapera.org/api/soc')});
const wss = new WebSocket.Server({server:app});l('RUNNING WS SOC running!');
var webSockets = {}; 
function auth(req,call){
		var legal=false;
	   	var uid=getuid(req.headers.cookie);
		if(typeof uid!='undefined')	legal=true;
		return legal;
}
//create a list of interval jobs 
//checksp()
	//interval
function intervals() {	
  wss.clients.forEach(function each(ws) {
	 var readymes=JSON.stringify({rule:"G.logged && !G.admin",fun:"if(G.ui==1){online_inter()}else{online_inter_offerprop()}",type:"com",text:"Interval 1",uid:1,cast:"one",name:"upvolume"} )
	 ws.send(readymes)
	 console.log('running interval')
	ws.ping();
});
}
	
wss.on("connection", function(ws,req,clien){
    	var uid=req.url.replace('/','');
			l(uid)
		if(typeof uid!='undefined')	{
			ws.uid =uid;
			webSockets["user"+ws.uid] = ws;	
		}	
	const interval = setInterval(intervals, 10000); 	
    // sending message
    ws.on("message",function message(data){
		console.log(`Received message ${data} from user ${uid}`);
		 var mes= g.isJson(data.toString());	
		 var readymes=JSON.stringify(mes);
	l(mes)		
   //cast message
   switch(mes.cast){
   case "all":
	  wss.clients.forEach(c=>{
	//	if (c !== ws && c.readyState === WebSocket.OPEN) {		
		c.send(readymes);
	//	}
		})
   break;
   case "one":		
	if(mes.hasOwnProperty('to')){
	var to="user"+mes.to;
	l("sends to "+to)		
	if(typeof webSockets[to]!='undefined'){
		webSockets[to].send(readymes);		
	}
	}
   break;
   }		
	})	
	
    ws.on("close",() => {
        l("client disconnected");
		 clearInterval(interval);
    });
})

function getuid(coo){
var cookies={};
  coo.split(';').forEach(function(cookie){
    var parts = cookie.match(/(.*?)=(.*)$/);
    var name = parts[1].trim();
    var value = (parts[2] || '').trim();
    cookies[name] = value;
  });
 return cookies['sid'];
}