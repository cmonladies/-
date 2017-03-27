 function hide(path, list, done) {
  let result = list.slice(0, 3);
  setTimeout(() => done(null, result), 5000); }
  hide('./', [1, 2, 3, 4, 5], (err, result) => {
    if (err) return console.log(err);
    console.log(result);
  });