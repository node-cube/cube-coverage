## install

  npm install cube-istanbul

## write a processor

```js
function Processor(cube) {
  this.cube = cube;
}

Processor.info = {
  type: 'script',  //  can be: style|script|template
  ext: '.js'    //  file ext, let cube know which file request should router to this processor
}

/**
 * process code
 * @param  {String}   file     file path, relative to options.root
 * @param  {Object}   options   {root, compress, moduleWrap, qpath}
 * @param  {Function} callback(err, res)
 *                    res {source, code, wraped}
 */
Processor.prototype.process = function (file, options, callback) {
  // your code here
}

module.exports = Processor;
```
