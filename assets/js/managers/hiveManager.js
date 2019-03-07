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
    HiveManager.prototype.clearHives = function () {
        window.localStorage.clear();
    };
    HiveManager.prototype.hasHive = function (key) {
        return window.localStorage.getItem(key) != null ? true : false;
    };
    HiveManager.prototype.storeHives = function () {
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
            hive[k.replace('_', '')] = h[k];
        });
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
