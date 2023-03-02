var db = openDatabase('DB_combo', '1.0', 'database', 10 * 1024 * 1024 * 1024);
var ultimaCombo = [];
var penultimaCombo = [];
let ultimiNumeri = () => {
  //Fonte https://www.superenalotto.it/archivio-estrazioni
  //https://www.gntn-pgd.it/gntn-info-ext-web/rest/gioco/statistiche/superenalotto/sestine/daticompleti?idPartner=GIOCHINUMERICI_INFO
  //per recuperare i dati : temp1.dati.gruppi[0].elementi.filter(numero => numero.valori[1].valore == "0").map((el)=>  el.simbolo)
  function returnVal(combo) {
    ultimaCombo = JSON.parse(combo).dati.gruppi[0].elementi.filter(numero => numero.valori[1].valore == "0").map((el) => el.simbolo);
    penultimaCombo = JSON.parse(combo).dati.gruppi[0].elementi.filter(numero => numero.valori[1].valore == "1").map((el) => el.simbolo);
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
  let res;
  try {
    res = factorial(n) / (factorial(k) * factorial(n - k));
  } catch (err) {
    console.error(err);
  }
  document.getElementById("result").innerHTML = "ci sono " + Math.round(res) + " combinazioni senza ripetizioni";
  confirm("Ci sono " + Math.round(res) + " combinazioni senza ripetizione.");
  return Math.round(res);
}

const percentualeAvanzamento = (n) => {
  document.getElementById("percentuale").innerHTML = "calcolo in corso ==> " + Math.round(n) + "%";
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
    let result = uniqueItems.length >= (combo.length / 2);//accetto solo 3 numeri che si distanziano tra loro per lo stesso valore
    return result;
  }
  let decine = (combo) => {
    let dec = [];
    combo.forEach((element, i, arr) => {
      let decina = Math.floor(Math.round(element) / 10);
      dec.push(decina);
    });
    let uniqueItems = [...new Set(dec)]
    let result = uniqueItems.length >= (combo.length / 2);//accetto solo 3 numeri con la stessa decina
    return result;
  }
  let estrazioni = (combo) => {
    let differenzeUltima = combo.filter(x => ultimaCombo.indexOf(x) === -1);
    let differenzePenultima = combo.filter(x => penultimaCombo.indexOf(x) === -1);
    return (differenzeUltima < (combo.length / 2) && differenzePenultima < (combo.length / 2));
  }
  // let result = (differenze(arrayCombo) && decine(arrayCombo));
  // let result = differenze(arrayCombo);
  // let result = decine(arrayCombo);
  let result = true;
  return result;
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
  query_scrittura += ") VALUES(";

  /*   for (var u = 0; u < 1 << n; u++) {
      if (bitcount(u) == c) {
        contaCicli++;
        let perc = (contaCicli / combTot) * 100;
        percentualeAvanzamento(perc);
        if (controllo(bitprint(u))) {
          let queryEseguibile = query_scrittura;
          queryEseguibile += bitprint(u).toString() + ");";
          console.log(queryEseguibile);
          db.transaction(function (tx) {
            tx.executeSql(queryEseguibile);
          });
        }
      }
    } */
  let arrNumb = Array.from({ length: n }, (value, index) => index + 1);
  
  let combTot = calcolo(n, c);

  k_combinations(arrNumb, c, c, combTot, 0);

  // window.pippo = s.sort();
  // return window.pippo;
}


//FONTE ORIGINALE: https://gist.github.com/axelpale/3118596
function k_combinations(set, k, c, combTot, contaCicli) {
  var i, j, combs, head, tailcombs;

  let query_scrittura = "INSERT INTO combinazioni (";
  for (let i = 1; i < (Math.round(k) + 1); i++) {
    i == k ? query_scrittura += "numero" + i : query_scrittura += "numero" + i + ",";
  }
  query_scrittura += ") VALUES(";
  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  // Assert {1 < k < set.length}

  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration:
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1, c, combTot, contaCicli);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      let comboAttuale = head.concat(tailcombs[j]);
      combs.push(comboAttuale);
      if (controllo(comboAttuale) && comboAttuale.length == c) {
        
        contaCicli++;

        let perc = (contaCicli / combTot) * 100;
        percentualeAvanzamento(perc);

        let queryEseguibile = query_scrittura;
        queryEseguibile += comboAttuale.toString() + ");";
        console.log(queryEseguibile);
        db.transaction(function (tx) {
          tx.executeSql(queryEseguibile);
        });
      }
    }
  }
  
  console.log("cicli totali : " + contaCicli);
  return combs;
}
