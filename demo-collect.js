'use strict';
var path = require("path"),
    fs = require('fs'),
    through = require('through2'),
    gutil = require('gulp-util'),
    moment = require("moment");




function collect(option){
    option = option || {};
    const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
    var infoObj = {}, infoList=[];
    return through.obj(function(file, enc, cb){
        if(file.isNull()){
            cb(null , file);
        }
        
        if(file.isStream()){
            cb(new gutil.PluginError("demo-collection", "Streaming not support"));
        }

        var info;
        try{
            info = JSON.parse(file.contents.toString());
        } catch(e){
            cb(new gutil.PluginError("demo-collection", 
                `${file.path}: file content must be object format`));
        }
        
        var dir = path.dirname(file.path);
        info.name = info.name || dir.slice(dir.lastIndexOf('/') + 1);
        
        if(! info.time){
            var file = path.join(path.dirname(file.path), info.vue ? 'index.vue' : 'index.html');
            info.time = moment(fs.lstatSync(file).mtime).format(TIME_FORMAT);
        }
        
        infoObj[info.name] = info;
        infoList.push(info.name);
        cb(null , file);
    }, function (cb){
        infoList.sort(function(a,b){
            return moment(infoObj[b].time, TIME_FORMAT).unix() - 
                moment(infoObj[a].time, TIME_FORMAT).unix(); 
        });

        // 标签聚合
        var tagObj = {}, tagList = [];
        infoList.forEach(function(name){
            var info = infoObj[name];
            if(info.tags && info.tags.length > 0){
                info.tags.forEach(function(item){
                    if(! tagObj[item]){
                        tagList.push(item);
                        tagObj[item] = [];
                    }
                    tagObj[item].push(info.name);
                })
            }
        });

        tagList.sort(function(a,b){
            return tagObj[b].length - tagObj[a].length
        })

        var res = {
            infoList,
            infoObj,
            tagList,
            tagObj
        };

        var writeStream = fs.createWriteStream(
            option.path  || path.join(__dirname, 'collect.json'));
        writeStream.end(JSON.stringify(res, null, 4));
    });
}

module.exports = collect;
