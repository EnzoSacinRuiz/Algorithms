/*Trabajando como bartender en un evento, almacenas en un árbol binario de búsqueda la carta con todos los tragos y sus respectivos precios.
A pedido de un cliente, que quiere ver la carta ordenada alfabéticamente, define un método de la clase BinarySearchTree que retorne solo los nombres de todos los tragos ordenados de la A a la Z.*/

"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
	inputString += inputStdin;
});

process.stdin.on("end", function () {
	inputString = inputString.split("\n");

	main();
});

function readLine() {
	return inputString[currentLine++];
}

class BinarySearchTree {
	constructor(valor) {
		this.value = valor;
		this.left = null;
		this.right = null;
	}

	insert(value) {
		if (value.nombre < this.value.nombre) {
			if (this.left === null) {
				var newTree = new BinarySearchTree(value);
				this.left = newTree;
			} else this.left.insert(value);
		} else {
			if (this.right === null) {
				var newTree = new BinarySearchTree(value);
				this.right = newTree;
			} else this.right.insert(value);
		}
	}
}

const arbol1 = new BinarySearchTree({ nombre: "Gancia", precio: 400 });
const arbol2 = new BinarySearchTree({ nombre: "Fernet", precio: 500 });
const arbol3 = new BinarySearchTree({ nombre: "Tom Collins", precio: 1000 });

arbol1.insert({ nombre: "Fernet", precio: 500 });
arbol1.insert({ nombre: "Agua", precio: 200 });
arbol1.insert({ nombre: "Malibu", precio: 400 });
arbol1.insert({ nombre: "Long Island", precio: 400 });

arbol2.insert({ nombre: "Martini", precio: 800 });
arbol2.insert({ nombre: "Tom Collins", precio: 1000 });
arbol2.insert({ nombre: "Bailey", precio: 900 });
arbol2.insert({ nombre: "Caipi", precio: 700 });

arbol3.insert({ nombre: "Fernet", precio: 500 });
arbol3.insert({ nombre: "Agua", precio: 200 });
arbol3.insert({ nombre: "Malibu", precio: 400 });
arbol3.insert({ nombre: "Long Island", precio: 400 });
arbol3.insert({ nombre: "Bailey", precio: 900 });
arbol3.insert({ nombre: "Martini", precio: 800 });
arbol3.insert({ nombre: "Caipi", precio: 700 });

/*
 * Completa el método 'enOrden' a continuación.
 *
 * La función debería retornar un ARREGLO DE STRINGS.
 * La función no recibe parámetros.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */

BinarySearchTree.prototype.enOrden = function () {
    // Tu código aquí
    const tragosOrdenados = [];

  function enOrdenRecursivo(node) {
    if (node !== null) {
      enOrdenRecursivo(node.left);
      tragosOrdenados.push(node.value.nombre);
      enOrdenRecursivo(node.right);
    }
  }

  enOrdenRecursivo(this);

  return tragosOrdenados;
};

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
	const arbolNumber = parseInt(readLine().trim());
	let arbol;

	if (arbolNumber == 1) arbol = arbol1;
	else if (arbolNumber == 2) arbol = arbol2;
	else arbol = arbol3;

	const result = arbol.enOrden();

	ws.write(result.join("\n") + "\n");

	ws.end();
}