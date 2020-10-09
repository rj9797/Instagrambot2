const ig = require('./instagram');

(async () => {

  await ig.initialize();
  await ig.login('abcd','abcd');

  await ig.likeTagsProcess(["nature","football"]);

  debugger;

})()
