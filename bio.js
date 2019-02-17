//Optimize images...

var compress_images = require('compress-images'), INPUT_path_to_images, OUTPUT_path;

console.log('Optimizing images...');
 
INPUT_path_to_images = '../images_full-size/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
OUTPUT_path = '../img/';

compress_images(INPUT_path_to_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
                                            {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                                            {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                                            {svg: {engine: 'svgo', command: '--multipass'}},
                                            {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic) {
            console.log('-------------');
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log('-------------');                                   
});