"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
var hiveManager_1 = require("../managers/hiveManager");
var hiveManager = new hiveManager_1.HiveManager();
jquery_1.default(document).ready(function () {
    addHivesToView();
    function addHivesToView() {
        hiveManager.hives.forEach(function (hive) {
            console.log(hive.name, hive.id);
            jquery_1.default(".hive-list").append(generateHiveTemplate(hive));
        });
    }
    function generateHiveTemplate(hive) {
        console.warn(hive.name, hive);
        return "<div class=\"hive-item-list\">\n                    <div class=\"title\">" + hive.name + "</div>\n                    <div class=\"delete\" data-index=\"" + hive.id + "\">\n                        <i class=\"far fa-trash-alt\"></i>\n                    </div>\n                </div>";
    }
    jquery_1.default(".hive-item-list .delete").on("click", function () {
        console.log(jquery_1.default(this).data("index"));
        hiveManager.removeHive(jquery_1.default(this).data("index"));
        jquery_1.default(this).parent().remove();
    });
    jquery_1.default(".from main .button").on("click", function () {
    });
    jquery_1.default(".details main .button").on("click", function () {
    });
    jquery_1.default(".details header .settings").on("click", function () {
    });
});
