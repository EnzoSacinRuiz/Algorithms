/*En el cine donde trabajas, las películas están guardadas en estanterías.
Escribe una función que permita encontrar todas las peliculas almacenadas en la misma estantería.
INSTRUCCIONES
Crea un nuevo método con el
nombre encontrar eliculas en el prototipo de LinkedList
Al recibir un número de estantería por parámetro, este método deberá retornar:
• El string: "No tenemos peliculas de la estanteria indicada", en caso de no encontrar ninguna película que pertenezca a la estanteria ingresada
• Caso contrario, una nueva LinkedList conteniendo todas las películas que tengan ese mismo número de estanteria.

Aclaraciones

- Si algún cliente del arreglo no tiene ningún pedido registrado, simplemente retorna una lista con los pedidos de todos los demás clientes.
• Si ningún cliente del arreglo tiene pedidos registrados, deberás devolver false.
• La clase LinkedList va se encuentra declarada con sus métodos add, search y remove*/

"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

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

function printSinglyLinkedList(node, sep, ws) {
  let current = node.head;
  while (current != null) {
    const { pedido, recibo } = current.value;
    ws.write(pedido + sep + recibo);
    current = current.next;

    if (current != null) {
        ws.write(sep);
        }
    }
}

/*
 * Completa el método 'entregarPedido' a continuación.
 *
 * La función debe retornar una LISTA ENLAZADA.
 * La función recibe un ARRAY DE STRINGS 'clientes' por parámetro.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */

LinkedList.prototype.entregarPedido = function (clientes) {
    // Tu código aquí:
     if (!this.head) {
    return "No tenemos peliculas de la estanteria indicada";
  }

  const peliculasEncontradas = new LinkedList();
  let nodoActual = this.head;

  while (nodoActual !== null) {
    if (nodoActual.value.estanteria === estanteria) {
      peliculasEncontradas.add(nodoActual.value);
    }
    nodoActual = nodoActual.next;
  }

  if (!peliculasEncontradas.head) {
    return "No tenemos peliculas de la estanteria indicada";
  }

  return peliculasEncontradas;
    

    

};

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const clientesCount = parseInt(readLine().trim(), 10);

  let clientes = [];

  for (let i = 0; i < clientesCount; i++) {
    const clientesItem = readLine();
    clientes.push(clientesItem);
  }
    
  const barCount = parseInt(readLine().trim(), 10);

  let bar = new LinkedList();

  for (let i = 0; i < barCount; i++) {
    const barItem = readLine().trim().split(" ");

    bar.add({
      nombre: barItem[0],
      trago: barItem[1],
      precio: parseInt(barItem[2], 10),
    });
  }
    
  const result = bar.entregarPedido(clientes);
    
  if (result === false) ws.write(result + "\n");
  else printSinglyLinkedList(result, "\n", ws);

  ws.write("\n");
  ws.end();
}