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
