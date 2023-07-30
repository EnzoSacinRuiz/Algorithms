/*En el cine donde trabajas, las películas están guardadas en estanterías.
Escribe una función que permita encontrar todas las peliculas almacenadas en la misma estantería.
INSTRUCCIONES
Crea un nuevo método con el
nombre encontrar eliculas en el prototipo de LinkedList
Al recibir un número de estantería por parámetro, este método deberá retornar:
• El string: "No tenemos peliculas de la estanteria indicada", en caso de no encontrar ninguna película que pertenezca a la estanteria ingresada
• Caso contrario, una nueva LinkedList conteniendo todas las películas que tengan ese mismo número de estanteria.*/

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let length;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    length = inputString.length;

    main();
});

function readLine() {
    return inputString[currentLine++];
}

class Node {
  constructor(valor) {
    this.value = valor;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(valor) {
    var nuevoNodo = new Node(valor);

    if (!this.head) {
      this.head = nuevoNodo;
    } else {
      var tailActual = this.head;
      while (tailActual.next !== null) {
        tailActual = tailActual.next;
      }
      tailActual.next = nuevoNodo;
    }
  }

  remove() {
    if (!this.head) {
      return undefined;
    }

    if (this.head.next === null) {
      var unicoNodo = this.head;
      this.head = null;
      return unicoNodo.value;
    }

    var nodoActual = this.head.next;
    var nodoPrevious = this.head;
    while (nodoActual.next !== null) {
      nodoPrevious = nodoActual;
      nodoActual = nodoActual.next;
    }
    nodoPrevious.next = null;
    return nodoActual.value;
  }

  search(arg) {
    var nodoActual = this.head;

    if (nodoActual === null) {
      return null;
    }

    while (nodoActual !== null) {
      if (typeof arg === "function") {
        if (arg(nodoActual.value)) {
          return nodoActual.value;
        }
      } else if (nodoActual.value === arg) {
        return nodoActual.value;
      }
      nodoActual = nodoActual.next;
    }

    return null;
  }
}


/*
 * Completa el método 'encontrarPelicula' a continuación.
 *
 * El método debe retornar una LISTA ENLAZADA.
 * El método recibe un NUMERO ENTERO 'estanteria' por parámetro.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */

LinkedList.prototype.encontrarPeliculas = function (estanteria) {
    // Tu código aquí:
     const peliculasEstanteria = new LinkedList();

  let nodoActual = this.head;
  while (nodoActual !== null) {
    if (nodoActual.value === estanteria) {
      peliculasEstanteria.add(nodoActual.value);
    }
    nodoActual = nodoActual.next;
  }

  if (!peliculasEstanteria.head) {
    return "No tenemos peliculas de la estanteria indicada";
  }

  return peliculasEstanteria;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let input = [];

    for (let i = 0; i < length; i++) {
        const inputItem = readLine();
        input.push(inputItem);
    }
    
    let lista = [];
    
    for(let i = 0; i < input.length - 1; i++){
        lista.push(parseInt(input[i]))
    }
        
    const estanteria = parseInt(input[input.length - 1]);
        
    const linkedList = new LinkedList();
    
    lista.forEach((item) => {
        linkedList.add(item)
    })

    const result = linkedList.encontrarPeliculas(estanteria);

    let finallyResult = [];

    let current = result.head;
    while (current != null) {
      finallyResult.push(current.value);
      current = current.next;
    }
        
    finallyResult.length
        ? ws.write(finallyResult.join('\n') + '\n')
        : ws.write(result.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + "\n")

    ws.end();
}