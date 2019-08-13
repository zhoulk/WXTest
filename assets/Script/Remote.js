// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var CusHttp = require("CusHttp")

var ServerIP = "http://127.0.0.1:12345"
//var ServerIP = "http://120.76.126.133:8081"

var http = new CusHttp()

module.exports = {
    login: function(code, name, cb){
        http.Post(ServerIP + "/login", {code:code, name:name}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    logout: function(userId, cb){
        http.Post(ServerIP + "/logout", {uid:userId}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    heart: function(userId, cb){
        http.Post(ServerIP + "/heart", {uid:userId}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    // Uid string

	// Name    string
    // Star    int32
    // Exp     int32
	// LvChao  string
	// Diamond int32
	// Level   int32
	// Scene   int32
	// Hair    int32
	// Coat    int32
	// Trouser int32
	// Neck    int32
    userInfo: function(userId, params, cb){
        if(params == null){
            params = {}
        }
        params.uid = userId
        http.Post(ServerIP + "/userInfo", params, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    getUserInfo: function(userId, cb){
        http.Post(ServerIP + "/getUserInfo", {uid:userId}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    sign: function (userId, cb) {
        http.Post(ServerIP + "/sign", {uid:userId}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    getSign: function(userId, cb){
        http.Post(ServerIP + "/getSign", {uid:userId}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    cloth: function(userId, params, cb){
        var s = JSON.stringify(params)
        http.Post(ServerIP + "/cloth", {uid:userId, snap:s}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    getCloth: function(userId, cb){
        http.Post(ServerIP + "/getCloth", {uid:userId}, function(response){
            if(cb){
                cb(response)
            }
        })
    },
    rank: function(userId, type, cb){
        http.Post(ServerIP + "/rank", {uid:userId, Type:type}, function(response){
            if(cb){
                cb(response)
            }
        })
    }
}