//Build Search Index...

const fs = require('fs');
const minify = require('html-minifier').minify;

console.log('Building Search Index...');

const listOfPathsToContentFiles = [];
const listOfURLsToIndexHTMLFiles = [];

// List all files in a directory recursively in a synchronous fashion
var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') dir=dir.concat('/')
  
  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory() && !dir.includes('node_modules') && !dir.includes('.git') && !dir.includes('Learning') && !dir.includes('temp')) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else if (file.includes('content.html')) {

      var pathToContent = dir + file;
      listOfPathsToContentFiles.push(pathToContent);

      var urlToIndexHTML = pathToContent.replace('../', 'https://dorrator.github.io/conspectuses/').replace('content.html', 'index.html');
      listOfURLsToIndexHTMLFiles.push(urlToIndexHTML);
    }
  });
  return filelist;
};

walkSync('../');

const JSONContent = [];

listOfPathsToContentFiles.forEach(function(pathToContent, index) {
  console.log('Reading file ' + pathToContent);
  fs.readFile(pathToContent, 'utf-8', (err, currentFileContent) => {
    if (err) return handleError(err);
  
    let content = currentFileContent;

    //Replace all line breaks with <br /> to avoid conflicts in JSON file
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');

    //Replace all tabs with 2 whitespaces to avoid conflicts in JSON file
    content = content.replace(/\t/g, '&nbsp;&nbsp;');

    //Minify HTML
    content = minify(content, {
	  removeAttributeQuotes: true
	});

	//Replace all quotation marks with &quot; to avoid conflicts in JSON file
    content = content.replace(new RegExp('"', 'g'), '&quot;');

    //Example of output string
	// {
	//     "isbn": "0520203259",
	//     "title": "Command Line API",
	//	   "url": "https://dorrator.github.io/conspectuses/Chrome DevTools/pages/Command Line API/index.html",
	//     "content": "<p>Some <b>markup</b> about some &quot;things&quot;</p>"
	// }

    var stringForSearchIndex = '\n  {\n    "isbn": "' + Math.random() + '",\n    "title": "' + 'Command Line API' + '",\n    "url": "' + listOfURLsToIndexHTMLFiles[index] + '",\n    "content": "' + content + '"\n    }';

	JSONContent.push(stringForSearchIndex);

	//If it is the last file in the list
	if (index >= listOfPathsToContentFiles.length - 1) {

	  var searchIndexOutput = '{\n  "pages": [' + JSONContent.join(',') + '\n  ]\n}';

	  fs.writeFileSync('../searchIndex.json', searchIndexOutput, function (error) {
	    if (error) throw error;
	  });

	  console.log('Search Index successfuly built');
	}
  });
});