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

const combinazioni = function (n, k) {
  loading(true);
  function comb(n, lst) {
    if (!n) return [[]];
    if (!lst.length) return [];

    var x = lst[0],
      xs = lst.slice(1);

    return comb(n - 1, xs).map(function (t) {
      return [x].concat(t);
    }).concat(comb(n, xs));
  }


  // [m..n]
  function range(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }


  loading(true).then(() => {
    //return comb(k, range(1, n));
    let combs = comb(k, range(1, n));
    loading(false);
    /* var obj = window.pippo;//{a: 123, b: "4 5 6"};
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj)); */

    var a = document.createElement('a');
    //a.href = 'data:' + data;
    a.href = 'data:' + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(combs));
    a.download = 'data.json';
    a.innerHTML = 'download JSON';

    var container = document.getElementById('container');
    container.appendChild(a);
  });

  /*
    .map(function (x) {
      return x.join(' ');
    }).join('\n');
*/
}

const stampa = () => {
  var printContents = document.getElementById("IDStampa").innerHTML; //ID del div da stampare
  var originalContents = document.body.innerHTML; // Contenuto originale del body
  document.body.innerHTML = printContents; // Setta contenuto della pagina con il div da stampare
  window.print(); //Stampa
  document.body.innerHTML = originalContents; // ripristina contenuto della pagina originale
}