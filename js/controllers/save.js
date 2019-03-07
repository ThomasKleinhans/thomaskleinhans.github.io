(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hiveManager_1 = require("../managers/hiveManager");
var hive_1 = require("../models/hive");
var geolocation_1 = require("../models/geolocation");
var hiveManager = new hiveManager_1.HiveManager();
$(document).ready(function () {
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get("id");
    var hive = hiveManager.getHive(id);
    var geolocation = null;
    if (hive) {
        fillHiveData(hive);
    }
    else {
        geolocation = new geolocation_1.Geolocation();
    }
    $(".form main .button").on("click", function () {
        hiveManager.retrieveHives();
        if (!id) {
            hiveManager.addHive(new hive_1.Hive($("#name").val().toString(), $("#address").val().toString(), parseInt($("#beesAmount").val().toString(), 10), $("#installDate").val().toString(), $("#lastHarvest").val().toString(), $("#description").val().toString(), $("#comment").val().toString(), geolocation));
            window.location.href = "../index.html";
        }
        else {
            hive.name = $("#name").val().toString();
            hive.address = $("#address").val().toString();
            hive.beesAmount = parseInt($("#beesAmount").val().toString(), 10);
            hive.installationDate = $("#installDate").val().toString();
            hive.lastHarvestDate = $("#lastHarvest").val().toString();
            hive.description = $("#description").val().toString();
            hive.comment = $("#comment").val().toString();
            hiveManager.updateHive(hive);
            window.location.href = "details-hive.html?id=" + hive.id;
        }
    });
    function fillHiveData(hive) {
        $("#name").val(hive.name);
        $("#address").val(hive.address);
        $("#beesAmount").val(hive.beesAmount);
        $("#installDate").val(hive.installationDate);
        $("#lastHarvest").val(hive.lastHarvestDate);
        $("#description").text(hive.description);
        $("#comment").text(hive.comment);
    }
});

},{"../managers/hiveManager":2,"../models/geolocation":3,"../models/hive":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HiveManager = (function () {
    function HiveManager() {
        this._hives = [];
        this.retrieveHives();
    }
    Object.defineProperty(HiveManager.prototype, "hives", {
        get: function () {
            return this._hives;
        },
        set: function (hives) {
            this._hives = hives;
        },
        enumerable: true,
        configurable: true
    });
    HiveManager.prototype.addHive = function (hive) {
        this._hives.push(hive);
        this.storeHives();
    };
    HiveManager.prototype.updateHive = function (hive) {
        var hiveIndex = this._hives.findIndex(function (h) { return h.id == hive.id; });
        if (hiveIndex > -1) {
            this._hives[hiveIndex] = hive;
            this.storeHives();
            return true;
        }
        else {
            return false;
        }
    };
    HiveManager.prototype.removeHive = function (id) {
        var hiveIndex = this._hives.findIndex(function (h) { return h.id == id; });
        if (hiveIndex > -1) {
            this._hives.splice(hiveIndex, 1);
            this.storeHives();
            return true;
        }
        else {
            return false;
        }
    };
    HiveManager.prototype.getHive = function (id) {
        var hive = this._hives.find(function (h) { return h.id == id; });
        return hive != undefined ? hive : undefined;
    };
    HiveManager.prototype.clearHives = function () {
        window.localStorage.clear();
    };
    HiveManager.prototype.hasHive = function (key) {
        return window.localStorage.getItem(key) != null ? true : false;
    };
    HiveManager.prototype.storeHives = function () {
        console.log(this._hives);
        window.localStorage.setItem("hives", this.stringifyHives(this._hives));
    };
    HiveManager.prototype.retrieveHives = function () {
        var hivesFromLocalStorage = window.localStorage.getItem("hives");
        if (hivesFromLocalStorage) {
            this._hives = JSON.parse(hivesFromLocalStorage);
            return this._hives;
        }
        return [];
    };
    HiveManager.prototype.prepareHiveStorage = function (h) {
        var keys = Object.keys(h);
        var hive = {};
        keys.forEach(function (k) {
            var newKey = k.replace('_', '');
            hive[newKey] = h[k];
            if (hive[newKey] instanceof Object) {
                var subKeys = Object.keys(hive[newKey]);
                var subObject_1 = {};
                subKeys.forEach(function (sk) {
                    var newSubKey = sk.replace('_', '');
                    subObject_1[newSubKey] = hive[newKey][sk];
                });
                hive[newKey] = subObject_1;
            }
        });
        console.log(hive);
        return hive;
    };
    HiveManager.prototype.stringifyHives = function (hives) {
        var preparedHives = [];
        for (var i in hives) {
            preparedHives.push(this.prepareHiveStorage(hives[i]));
        }
        return JSON.stringify(preparedHives);
    };
    return HiveManager;
}());
exports.HiveManager = HiveManager;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Geolocation = (function () {
    function Geolocation(latitude, longitude) {
        if (latitude == undefined || longitude == undefined) {
            this.getCurrentPosition();
        }
        else {
            this._longitude = longitude;
            this._latitude = latitude;
            console.log(this._longitude);
            console.log(this._latitude);
        }
    }
    Object.defineProperty(Geolocation.prototype, "latitude", {
        get: function () {
            return this._latitude;
        },
        set: function (latitude) {
            this._latitude = latitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geolocation.prototype, "longitude", {
        get: function () {
            return this._longitude;
        },
        set: function (longitude) {
            this._longitude = longitude;
        },
        enumerable: true,
        configurable: true
    });
    Geolocation.prototype.getCurrentPosition = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCurrentPositionSuccess.bind(this), this.getCurrentPositionError);
        }
        else {
            console.warn("Geolocation isn't allowed");
        }
    };
    Geolocation.prototype.getCurrentPositionSuccess = function (position) {
        this._latitude = position.coords.latitude;
        this._longitude = position.coords.longitude;
    };
    Geolocation.prototype.getCurrentPositionError = function (error) {
        console.warn("Couldn't get geolocation", error);
    };
    return Geolocation;
}());
exports.Geolocation = Geolocation;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var geolocation_1 = require("./geolocation");
var Hive = (function () {
    function Hive(name, address, beesAmount, installationDate, lastHarvestDate, description, comment, geolocation) {
        this._id = utils_1.Guid.genId();
        this._name = name;
        this._address = address == undefined ? "" : address;
        this._beesAmount = beesAmount == undefined ? 0 : beesAmount;
        this._installationDate = installationDate == undefined ? "" : installationDate;
        this._lastHarvestDate = lastHarvestDate == undefined ? "" : lastHarvestDate;
        this._description = description == undefined ? "" : description;
        this._comment = comment == undefined ? "" : comment;
        this._geolocation = geolocation == undefined ? new geolocation_1.Geolocation() : geolocation;
        console.log(this._geolocation);
    }
    Object.defineProperty(Hive.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (address) {
            this._address = address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "beesAmount", {
        get: function () {
            return this._beesAmount;
        },
        set: function (beesAmount) {
            this._beesAmount = beesAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "installationDate", {
        get: function () {
            return this._installationDate;
        },
        set: function (installationDate) {
            this._installationDate = installationDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "lastHarvestDate", {
        get: function () {
            return this._lastHarvestDate;
        },
        set: function (lastHarvestDate) {
            this._lastHarvestDate = lastHarvestDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "comment", {
        get: function () {
            return this._comment;
        },
        set: function (comment) {
            this._comment = comment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hive.prototype, "geolocation", {
        get: function () {
            return this._geolocation;
        },
        set: function (geolocation) {
            this._geolocation = geolocation;
        },
        enumerable: true,
        configurable: true
    });
    return Hive;
}());
exports.Hive = Hive;

},{"../utils/utils":5,"./geolocation":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid = (function () {
    function Guid() {
    }
    Guid.genId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());
exports.Guid = Guid;

},{}]},{},[1]);
