var gulp = require("gulp"),
    path = require("path"),
    collect = require("./demo-collect"),
    debug = require("gulp-debug");

gulp.task('demo-info', function(){
    var paths = path.join(__dirname, "./demos/**/info.json");
    console.log(paths)
    return gulp.src(paths)
            .pipe(debug())
            .pipe(collect({path: path.join(__dirname,"./demos/collect.json")}))
});
    
