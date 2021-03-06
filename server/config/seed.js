/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Magnet = require('../api/magnet/magnet.model');

Magnet.find({}).remove(function() {
  Magnet.create(
    {
       "character":"e",
       "color":"blue",
       "x":282.4040832519531,
       "y":222.40408325195312,
       "rotation":-15,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"a",
       "color":"blue",
       "x":313.7947082519531,
       "y":219.79470825195312,
       "rotation":-15,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"l",
       "color":"green",
       "x":257.140625,
       "y":222.140625,
       "rotation":180,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"v",
       "color":"yellow",
       "x":342.2842102050781,
       "y":217.28424072265625,
       "rotation":-30,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"e",
       "color":"yellow",
       "x":374.1435852050781,
       "y":222.14361572265625,
       "rotation":-30,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"e",
       "color":"red",
       "x":454.2841796875,
       "y":219.28424072265625,
       "rotation":-30,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"e",
       "color":"green",
       "x":467.5290832519531,
       "y":275.5290832519531,
       "rotation":-15,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"a",
       "color":"red",
       "x":419.9665832519531,
       "y":275.9665832519531,
       "rotation":-15,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"e",
       "color":"yellow",
       "x":345,
       "y":274,
       "rotation":0,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"a",
       "color":"blue",
       "x":504.42486572265625,
       "y":224.42486572265625,
       "rotation":30,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"m",
       "color":"blue",
       "x":427.1853332519531,
       "y":221.18533325195312,
       "rotation":-15,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"m",
       "color":"red",
       "x":313.1435852050781,
       "y":276.1435852050781,
       "rotation":-30,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"s",
       "color":"red",
       "x":369,
       "y":275,
       "rotation":0,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"s",
       "color":"blue",
       "x":394.7947082519531,
       "y":275.7947082519531,
       "rotation":-15,
       "selected":null,
       "newSelected":false
    },
    {
       "character":"g",
       "color":"yellow",
       "x":446.359375,
       "y":276.359375,
       "rotation":0,
       "selected":null,
       "newSelected":false
    }
  );
});


/*

[{"_id":"5a4df1a80f8ac57644a4495c","character":"e","color":"blue","x":282.4040832519531,"y":222.40408325195312,"rotation":-15,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1ad0f8ac57644a4495d","character":"a","color":"blue","x":313.7947082519531,"y":219.79470825195312,"rotation":-15,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1b20f8ac57644a4495e","character":"l","color":"green","x":257.140625,"y":222.140625,"rotation":180,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1c30f8ac57644a4495f","character":"v","color":"yellow","x":342.2842102050781,"y":217.28424072265625,"rotation":-30,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1ce0f8ac57644a44960","character":"e","color":"yellow","x":374.1435852050781,"y":222.14361572265625,"rotation":-30,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1d20f8ac57644a44961","character":"e","color":"red","x":454.2841796875,"y":219.28424072265625,"rotation":-30,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1d40f8ac57644a44962","character":"e","color":"green","x":467.5290832519531,"y":275.5290832519531,"rotation":-15,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1d90f8ac57644a44963","character":"a","color":"red","x":419.9665832519531,"y":275.9665832519531,"rotation":-15,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1de0f8ac57644a44964","character":"e","color":"yellow","x":345,"y":274,"rotation":0,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1e70f8ac57644a44965","character":"a","color":"blue","x":504.42486572265625,"y":224.42486572265625,"rotation":30,"selected":"tYv6JOUp0xy0ohxoAAAA","newSelected":false,"__v":0},{"_id":"5a4df1ef0f8ac57644a44966","character":"m","color":"blue","x":427.1853332519531,"y":221.18533325195312,"rotation":-15,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df1f70f8ac57644a44967","character":"m","color":"red","x":313.1435852050781,"y":276.1435852050781,"rotation":-30,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df2020f8ac57644a44968","character":"s","color":"red","x":369,"y":275,"rotation":0,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df20b0f8ac57644a44969","character":"s","color":"blue","x":394.7947082519531,"y":275.7947082519531,"rotation":-15,"selected":null,"newSelected":false,"__v":0},{"_id":"5a4df21c0f8ac57644a4496a","character":"g","color":"yellow","x":446.359375,"y":276.359375,"rotation":0,"selected":null,"newSelected":false,"__v":0}]
*/
