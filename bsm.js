//Build sitemap.xml

const fs = require('fs');

console.log('Building sitemap.xml...');

// List all files in a directory recursively in a synchronous fashion
var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') dir=dir.concat('/')
  
  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory() && !dir.includes('node_modules') && !dir.includes('.git') && !dir.includes('temp')) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else if (file.includes('index.html')) {
      var url = 'https://quick-geek.github.io/' + dir;
      var siteMapString = '  <url>\n    <loc>' + url + file + '</loc>\n  </url>\n';
      filelist.push(siteMapString);
    }
  });
  return filelist;
};

var sitemapOutput = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + walkSync('.').join('') + '</urlset>'

fs.writeFileSync('sitemap.xml', sitemapOutput, function (error) {
  if (error) throw error;
});