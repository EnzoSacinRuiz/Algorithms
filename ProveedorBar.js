/*Nuestro proveedor ha llegado con una nueva carga de bebidas para nuestro bar. Mientras recogemos las botellas y las guardamos en la barra, debemos llevar un registro de cuánto ha ingresado de cada una. Para esto necesitaremos crear una función.
La función guardar Tragos debe recibir por parámetro una Queue con bebidas. Removiéndolas una por una, debe almacenarlas en un objeto que servirá de contenedor, para luego retornarlo.
INSTRUCCIONES
• Recibes una Queue por parámetro. Cada elemento de la Queue es un string que representa una botella de una bebida.
• Debes crear un objeto, donde cada propiedad tenga el nombre de un trago.
Dentro de la propiedad guardarás otro objeto con una propiedad trago (string) y otra propiedad cantidad (número).
• Debes devolver el objeto.
• Respeta el principio FIFO para recorrer la
Queue de bebidas.
• La clase Queue ya está definida con sus métodos enqueue, dequeue y size.*/

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

class Queue{
    constructor(){
        this.array = []
    }
    
    enqueue(elemento) {
      return this.array.push(elemento);
    };
    
    dequeue() {
      return this.array.shift();
    };

    size() {
      return this.array.length;
    };
}

/*
 * Completa la función 'guardarTragos' a continuación.
 *
 * La función debe retornar un OBJETO.
 * La función recibe una QUEUE por parámetro.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */


function guardarTragos (tragosQueue) {
    // Tu código aquí
    const registro = {};

  while (tragosQueue.size() > 0) {
    const trago = tragosQueue.dequeue();

    if (!registro[trago]) {
      registro[trago] = {
        trago: trago,
        cantidad: 1
      };
    } else {
      registro[trago].cantidad++;
    }
  }

  return registro;
    
};

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	let tragosQueue = new Queue();

	for (let i = 0; i < length; i++) {
		tragosQueue.enqueue(readLine().trim());
	}

	const result = guardarTragos(tragosQueue);

	for (let prop in result) {
		ws.write(prop + " " + result[prop].cantidad + "\n")
	}

	ws.end();
}