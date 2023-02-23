const loading = (active) => {
  return (new Promise(function (resolve, reject) {

    let div = document.getElementById("loader");
    active ? div.style.display = "block" : div.style.display = "none";

    resolve();
  }))
}

const factorial = (x) => {
  if (x === 0) {
    return 1;
  }
  return x * factorial(x - 1);

}

const calcolo = (n, k) => {
  loading(true);
  //console.log(n,k)
  try {
    window.pippo = "";
    let res;
    res = factorial(n) / (factorial(k) * factorial(n - k));
    console.log(res);
  } catch (err) {
    console.error(err);
  }
  /*     try {
        window.pippo = combinazioni(n,k);
      } catch(err){
        console.log(err);
      } */
  loading(false);
}

const combinazioni = function (k, n) {

  // n -> [a] -> [[a]]
  function comb(n, lst) {
    if (!n) return [[]];
    if (!lst.length) return [];

    var x = lst[0],
      xs = lst.slice(1);

    return comb(n - 1, xs).map(function (t) {
      return [x].concat(t);
    }).concat(comb(n, xs));
  }

  // f -> f
  function memoized(fn) {
    m = {};
    return function (x) {
      var args = [].slice.call(arguments),
        strKey = args.join('-');

      v = m[strKey];
      if ('u' === (typeof v)[0])
        m[strKey] = v = fn.apply(null, args);
      return v;
    }
  }

  // [m..n]
  function range(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }

  var fnMemoized = memoized(comb),
    lstRange = range(1, k);

  var a = document.createElement('a');
  //a.href = 'data:' + data;
  //a.href = 'data:' + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(combs));
  a.href = 'data:' + "text/json;charset=utf-8," + encodeURIComponent(fnMemoized(n, lstRange).map(function (x) {
    return x.join(',');
  }).join('\n'));
  a.download = 'data.csv';
  a.innerHTML = 'download CSV';

  var container = document.getElementById('container');
  container.appendChild(a);

  /* return fnMemoized(n, lstRange)

  .map(function (x) {
    return x.join(' ');
  }).join('\n'); */
  return false;
}

const stampa = () => {
  var printContents = document.getElementById("IDStampa").innerHTML; //ID del div da stampare
  var originalContents = document.body.innerHTML; // Contenuto originale del body
  document.body.innerHTML = printContents; // Setta contenuto della pagina con il div da stampare
  window.print(); //Stampa
  document.body.innerHTML = originalContents; // ripristina contenuto della pagina originale
}