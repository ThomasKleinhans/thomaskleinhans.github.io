(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hiveManager_1 = require("../managers/hiveManager");
var hiveManager = new hiveManager_1.HiveManager();
$(document).ready(function () {
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get("id");
    var hive = hiveManager.getHive(id);
    if (hive) {
        fillHiveData(hive);
    }
    else {
        window.location.href = "../index.html";
    }
    function fillHiveData(hive) {
        console.log(hive.geolocation);
        $("#name").text(hive.name);
        $("#address").text(hive.address);
        $("#beesAmount").text(hive.beesAmount);
        $("#installDate").text(hive.installationDate);
        $("#lastHarvest").text(hive.lastHarvestDate);
        $("#description").text(hive.description);
        $("#comment").text(hive.comment);
        $("#latitude").text(hive.geolocation.latitude.toFixed(4));
        $("#longitude").text(hive.geolocation.longitude.toFixed(4));
    }
    $(".details header .settings").on("click", function () {
        window.location.href = "save-hive.html?id=" + hive.id;
    });
    $(".details main .button").on("click", function () {
        window.location.href = "measures-hive.html?id=" + hive.id;
    });
});

},{"../managers/hiveManager":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
