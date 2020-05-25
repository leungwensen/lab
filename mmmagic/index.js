const fs = require('fs');
const magic = require('stream-mmmagic');
const input = fs.createReadStream('./fync_0001.fync');

magic(input, function (err, mime, output) {
  if (err) throw err;

  console.log(mime);

  // will print the *whole* file
  // output.pipe(process.stdout);
});
