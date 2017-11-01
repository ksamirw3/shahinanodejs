var types = {'driver': 'dr', client: 'cl'};
exports.types = types;
var allUsersRejesterd = {dr: [], cl: []};
//-------------------------------

var setAttr = function ($socetId, key, val) {
    var $t = token($socetId)
    allUsersRejesterd[$t.type][$t.type + $t.token][key] = val;
}


var token = function ($token) {
    var rt = {type: '', token: ''}
    try {
        rt.type = $token.substring(0, 2);
        rt.token = $token.substring(2);
        return rt;
    } catch (e) {
        //  require('../Helper/Log')().error(e.message)
    }
}
exports.tokenAlis = token;
exports.add = function (socketId, $driver) {
    var $t = token(socketId)
    allUsersRejesterd[$t.type][$t.type + $t.token] = $driver;
}
//-------------------------------
exports.get = function ($socetId) {
    var $t = token($socetId)
    return allUsersRejesterd[$t.type][$t.type + $t.token]
}

//-------------------------------
exports.allDrivers = function () {
    return allUsersRejesterd[types.driver]
}
exports.allClients = function () {
    return allUsersRejesterd[types.client];
}

//-------------------------------

exports.delete = function ($socetId) {

    // for (var type in allUsersRejesterd) {
    //     for (var i in allUsersRejesterd[type]) {
    //         var currentSocketId = allUsersRejesterd[type][i].socketId;
    //         if (currentSocketId == $socetId) {
    //             console.log('driver deleted');
    //             delete allUsersRejesterd[i];
    //         }
    //     }
    // }


}

exports.setAttr = function ($socetId, key, val) {
    var $t = token($socetId);
    console.log($socetId, $t);
    allUsersRejesterd[$t.type][$t.type + $t.token][key] = val;

}

exports.setAttr = setAttr


exports.user = function ($socetId) {
    var $t = token($socetId);
    return {
        isInTrip(){
            return ( allUsersRejesterd[$t.type][$t.type + $t.token].trip == null) ? false : true;
        },
        assignToTrip: function (val) {
            setAttr($socetId, 'trip', val);

        },
        removeTrip: function () {
            setAttr($socetId, 'trip', null);
        },
        myTrips: function () {
            return {

                setCurrent: function (orderId) {
                    allUsersRejesterd[$t.type][$t.type + $t.token].currentTrip = orderId;
                    allUsersRejesterd[$t.type][$t.type + $t.token].totalTrips.push(orderId);
                }
            }
        }
    }
}

