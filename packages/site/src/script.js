var db = openDatabase('DB_combo', '1.0', 'database', 10 * 1024 * 1024 * 1024);
var ultimaCombo = [];
var penultimaCombo = [];
let ultimiNumeri = () => {
  //Fonte https://www.superenalotto.it/archivio-estrazioni
  //https://www.gntn-pgd.it/gntn-info-ext-web/rest/gioco/statistiche/superenalotto/sestine/daticompleti?idPartner=GIOCHINUMERICI_INFO
  //per recuperare i dati : temp1.dati.gruppi[0].elementi.filter(numero => numero.valori[1].valore == "0").map((el)=>  el.simbolo)
  function returnVal(combo) {
    ultimaCombo = JSON.parse(combo).dati.gruppi[0].elementi.filter(numero => numero.valori[1].valore == "0").map((el)=>  el.simbolo);
    penultimaCombo = JSON.parse(combo).dati.gruppi[0].elementi.filter(numero => numero.valori[1].valore == "1").map((el)=>  el.simbolo);
  }
  let file = "https://www.gntn-pgd.it/gntn-info-ext-web/rest/gioco/statistiche/superenalotto/sestine/daticompleti?idPartner=GIOCHINUMERICI_INFO"
  fetch(file)
    .then(x => x.text())
    .then((y) => {
      returnVal(y)
    })
    .catch(error => new Error(error));
}
ultimiNumeri();

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

/* const combinazioni = function (k, n) {

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

  return false;
} 
*/

const stampa = () => {
  var printContents = document.getElementById("IDStampa").innerHTML; //ID del div da stampare
  var originalContents = document.body.innerHTML; // Contenuto originale del body
  document.body.innerHTML = printContents; // Setta contenuto della pagina con il div da stampare
  window.print(); //Stampa
  document.body.innerHTML = originalContents; // ripristina contenuto della pagina originale
}

/* function memoize(func) {
  var cache = {};
  return function () {
    var argsAsString = JSON.stringify(arguments);
    cache[argsAsString] = cache[argsAsString] || func.apply(func, arguments);
    return cache[argsAsString];
  };
}


const trovaProxNum = (arrIni, n, k, num, posizione) => {
  let arrUpdated = [];
  for (let i0 = 0; i0 < n; i0++) {
    arrUpdated[i0] = [];
    arrUpdated[i0][0] = num;
    for (let i = 1; i < k; i++) {
      if (Math.round(arrUpdated[i0][i - 1]) + 1 <= n) {
        let numProx = Math.round(arrUpdated[i0][i - 1])+1
        arrUpdated[i0].push(numProx)
      }
    }
  }
  return arrUpdated;
}

var memoizedTrovaProxNum = memoize(trovaProxNum);

const combXNum = (n, k, num, posizione) => {
  let data = memoizedTrovaProxNum([[Math.round(num)]], Math.round(n), Math.round(k), Math.round(num), Math.round(posizione));

  var a = document.createElement('a');
  //a.href = 'data:' + data;
  a.href = 'data:' + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  //a.href = 'data:' + "text/csv;charset=utf-8," + encodeURIComponent(data);
  // a.download = 'data-[' + num + '].csv';
  a.download = 'data-[' + num + '].json';
  // a.innerHTML = 'download CSV [' + num + ']<br/>';
  a.innerHTML = 'download JSON [' + num + ']<br/>';
  var container = document.getElementById('container');
  container.appendChild(a);
}

const combinazioni = function (n, k) {
  loading(true);
  let arrayNumeri = Array.from({ length: n }, (_, i) => i + 1);
  arrayNumeri.map((num) => {
    combXNum(n, k, num, 0);
    // console.log(num);
  });
  loading(false);
} */


const controllo = (arrayCombo) => {
  let lunghezza = arrayCombo.length;
  let differenze = (combo) => {
    let diff = [];
    combo.forEach((element, i, arr) => {
      arr[i - 1] ? diff.push((element - arr[i - 1])) : void (0);
    });
    let uniqueItems = [...new Set(diff)]
    let result = uniqueItems.length > 3;//accetto solo 3 numeri che si distanziano tra loro per lo stesso valore
    return result;
  }
  let decine = (combo) => {
    let dec = [];
    combo.forEach((element, i, arr) => {
      let decina = Math.floor(Math.round(element) / 10);
      dec.push(decina);
    });
    let uniqueItems = [...new Set(dec)]
    let result = uniqueItems.length > 3;//accetto solo 3 numeri con la stessa decina
    return result;
  }

  return (differenze(arrayCombo) && decine(arrayCombo));
}

function bitprint(u) {
  var s = [];
  for (var n = 0; u; ++n, u >>= 1)
    if (u & 1) s.push(n + 1);
  return s;
}
function bitcount(u) {
  for (var n = 0; u; ++n, u = u & (u - 1));
  return n;
}
function combinazioni(n, c) {
  let queryPulizia = "DROP TABLE combinazioni;";
  db.transaction(function (tx) {
    tx.executeSql(queryPulizia);
  });

  // var s = [];
  let query = "CREATE TABLE combinazioni (";
  for (let i = 1; i < (Math.round(c) + 1); i++) {
    i == c ? query += "numero" + i : query += "numero" + i + ",";
  }
  query += ");"
  console.log(query);
  db.transaction(function (tx) {
    tx.executeSql(query);
  });

  let query_scrittura = "INSERT INTO combinazioni (";
  for (let i = 1; i < (Math.round(c) + 1); i++) {
    i == c ? query_scrittura += "numero" + i : query_scrittura += "numero" + i + ",";
  }
  query_scrittura += ") VALUES("

  for (var u = 0; u < 1 << n; u++) {
    if (bitcount(u) == c) {
      if (controllo(bitprint(u))) {
        let queryEseguibile = query_scrittura;
        queryEseguibile += bitprint(u).toString() + ");";
        console.log(queryEseguibile);
        db.transaction(function (tx) {
          tx.executeSql(queryEseguibile);
        });
        // console.log(bitprint(u))
      }
    }
    // s.push(bitprint(u))
  }
  // window.pippo = s.sort();
  // return window.pippo;
}
