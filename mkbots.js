setTimeout(function() {
	"use strict";
    window.bot = {x:0, y:0, ip:null, byteLength:0};
    WebSocket.prototype.Asend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(arrayBuffer) {
        this.Asend(arrayBuffer);
        var dataView = new DataView(arrayBuffer);
        if(dataView.byteLength === 21) {
            if(dataView.getUint8(0) === 16) {
                bot.x = dataView.getFloat64(1, true);
                bot.y = dataView.getFloat64(9, true);
                bot.byteLength = dataView.byteLengthsocket
            }
        };
        if(dataView.byteLength === 13) {
            if(dataView.getUint8(0) === 16) {
                bot.x = dataView.getInt32(1, true);
                bot.y = dataView.getInt32(5, true);
                bot.byteLength = dataView.byteLength
            }
        };
        if(dataView.byteLength === 5 || dataView.byteLength < 4) {
            if(dataView.getUint8(0) === 16) {
                bot.x = dataView.getInt16(1, true);
                bot.y = dataView.getInt16(3, true);
                bot.byteLength = dataView.byteLength
            }
        };
        if(this.url !== null) {
            bot.ip = this.url;
            console.log(bot.ip)
        }
    };
	if(window.botServer) {
		var socket = io.connect('ws://' + window.botServer);
	} else {
		var socket = io.connect("ws://127.0.0.1:8081");
	}
    document.addEventListener("keydown", function(keyboardEvent) {
		if(keyboardEvent.key) {
			switch(keyboardEvent.key) {
				case "s":
					socket.emit("split");
					break;
				case "f":
					socket.emit("eject");
					break;
				case "[":
					socket.emit("spam");
					break;
			}
		
		} else {
			var keyCharacterValue = keyboardEvent.keyCode || keyboardEvent.which;
			switch(keyCharacterValue) {
				case 83:
					socket.emit("split");
					break;
				case 70:
					socket.emit("eject");
					break;
				case 91:
					socket.emit("spam");
					break
			}
		}
    });
    setInterval(function() {
		socket.emit("movement", {x:bot.x, y:bot.y, byteLength:bot.byteLength})
	}, 100);
    setTimeout(function() {
		$( "#overlays" ).after( "<div style='z-index: 10000000; border-radius: 4px;position: fixed; top: 300px; right: 10px; text-align: center; width: 200px; background-color: #000; opacity: 0.9; padding: 7px;'> <div style='border-radius: 25px; text-indent:0; border:3px solid #fff; display:inline-block; color:#000; font-family:arial; font-size:15px; font-weight:bold; font-style:normal; height:30px; -webkit-box-shadow: 0px 0px 52px -6px rgba(46,204,113,1); -moz-box-shadow: 0px 0px 52px -6px rgba(46,204,113,1); box-shadow: 0px 0px 52px -6px rgb(202, 202, 202); line-height:1.5em; text-decoration:none; text-align:center; width: 190px; color: #fff;'>MK Bots</div><br><br><button id='start-bots' style='color:green;'>Start</button><button id='stop-bots' style='color:red; display:none;'>Stop</button><br><br> <a style='color: #fff; font-family: arial;'>Bots: </a><a style='color: #fff; font-family: arial;' id='minionCount'></a><br> <a style='color: #fff; font-family: arial;'>X/Y: </a><a style='color: #fff; font-family: arial;'id='gh45nmvsy'>0,0</a><br><br><a style='color: #fff; font-family: arial;'>S - Split Bots</a><br><a style='color: #fff; font-family: arial;'>F - Bots Feed </a> <div style='margin-top:10px; text-align:center; color:white; font-family:arial;'>MK Bots Beta!<br><a href='bit.ly/mkgamesbots' target='_blank' style='color:#dcf5f9;'></a></div></div>" );
		document.getElementById("start-bots").onclick = function() {
            socket.emit("start", {ip:bot.ip!== null?bot.ip:0, origin:location.origin})
			document.getElementById("start-bots").style.display = "none";
			document.getElementById("stop-bots").style.display = "inline-block";
        }
		document.getElementById("stop-bots").onclick = function() {
            socket.emit("stop")
			document.getElementById("stop-bots").style.display = "none";
			document.getElementById("start-bots").style.display = "inline-block";
        }
    }, 2000);
    socket.on("botCount", function(botCount) {
        $("#minionCount").html(botCount)
    })
}, 200)