const {src, dest, parallel, series, watch, task} = require('gulp');
const
    sass = require('gulp-sass'),  concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'), autoprefixer = require('gulp-autoprefixer'),
    del = require('del'), browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'), browserify = require('gulp-browserify'),
    imagemin = require('gulp-imagemin'), cache = require('gulp-cache'),
    uglify = require('gulp-uglify');

function htaccess(){
    return src('./src/**/.htaccess', {dot: true})
    .pipe(dest('./build/'))
    .pipe(browserSync.stream());
}


filesExt = './src/**/*.+(txt|php|html|css|jpg|JPG|jpeg|png|gif|pdf|svg|mov|MOV|ttf|otf|webmanifest|ini|xml)';
function files() {
    return src(filesExt)
        .pipe(dest('./build/'))
        .pipe(browserSync.stream());
}

function delImg() {
    return del(['./build/img/**/*']);
}
function delHtml() {
    return del(['./build/**/*.+(php|html)']);
}
function delStyle() {
    return del(['./build/**/*.+(scss|css)']);
}


function imgMin() {
    return src('./src/img/**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(
        cache(
        imagemin()
        )
        )
        .pipe(dest('./build/img/'));
}


scriptsArr = [
    // './src/public/js/token.js',
    // './node_modules/jquery/dist/jquery.min.js',
    // './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    // './node_modules/slick-carousel/slick/slick.min.js',
    // './src/public/js/libjs.js',
    './src/**/*.js',
    
];

function scripts() {
    return src(
            scriptsArr
        )
        // .pipe(
        //     babel({
        //         presets: ['@babel/env']
        //     })
        //     )
        // .pipe(uglify())

        .pipe(concat('index.js'))
        .pipe(dest('./build/public/js'))
        .pipe(browserSync.stream());
}

function style() {
    return src('./src/public/styles/styles.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 15 versions','>1%', 'ie 7', 'ie 8'],
            cascade: false
        }))

        .pipe(cleanCSS({level:2}))

        .pipe(dest('./build/public/styles'))
        .pipe(browserSync.stream());
}

function brSync() {
    browserSync.init({
        proxy: 'transliterator.local',
        // tunnel:true
    });
    watch('./src/**/*.scss', style);
    watch(scriptsArr, scripts);
    watch(filesExt, files);
    watch('./src/**/.htaccess', htaccess);
    
}

task('styles', style);
task('scripts', scripts);
task('files', files);
task('htaccess', htaccess);
task('imgMin', imgMin);
task('delImg', delImg);
task('delHtml', delHtml);
task('delStyle', delStyle);
task('watch', brSync);
