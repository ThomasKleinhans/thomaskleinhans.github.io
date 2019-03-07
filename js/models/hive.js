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
