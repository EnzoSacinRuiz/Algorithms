/*Un cliente de nuestra tienda de pantalones te ha solicitado un pantalón de una talla determinada.
Es necesario ir a buscar al inventario los pantalones y obtener las prenda solicitada según la talla.
Para esto tendrás que implementar una función que recibirá como parámetros una lista de tallas y un número de talla solicitado.
La función debe retornar, dentro de un objeto, dos pilas. Una con los pantalones solicitados, y otra con los pantalones restantes.

INSTRUCCIONES
Los parámetros que recibes son:
• lista DeTallas: arreglo de números.
•tallaBuscada: número.
Debe retornar un objeto con dos propiedades:
• pantalonesEncontrados: Stack de números en el que cada número es la talla de un pantalón que coincide con la buscada.
• pantalonesRe*/

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

class Stack {
	constructor() {
		this.array = [];
	}

	push(elemento) {
		this.array.push(elemento);
	}

	pop() {
		return this.array.pop();
	}

	size() {
		return this.array.length;
	}
}

/*
 * Completa la función 'apilarPantalones' a continuación.
 *
 * La función debe retornar un OBJETO.
 * La función recibe por parámetro:
 *  - un ARREGLO DE ENTEROS 'listaDeTallas'.
 *  - un ENTERO 'talla'.
 *
 *  como parámetros.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */

function apilarPantalones(listaDeTallas, talla) {
    // Tu código aquí
     const pantalonesEncontrados = new Stack();
  const pantalonesRestantes = new Stack();

  for (let i = 0; i < listaDeTallas.length; i++) {
    const tallaActual = listaDeTallas[i];

    if (tallaActual === talla) {
      pantalonesEncontrados.push(tallaActual);
    } else {
      pantalonesRestantes.push(tallaActual);
    }
  }

  return {
    pantalonesEncontrados: pantalonesEncontrados,
    pantalonesRestantes: pantalonesRestantes
  };
    

}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const listaDeTallas = readLine()
		.split(" ")
		.map(n => parseInt(n));

	const talla = parseInt(readLine().trim(), 10);

	const { pantalonesEncontrados, pantalonesRestantes } = apilarPantalones(
		listaDeTallas,
		talla
	);

	if (
		!(pantalonesEncontrados instanceof Stack) ||
		!(pantalonesRestantes instanceof Stack)
	) {
        ws.write("la función debe retornar un objeto con dos Stacks adentro\n");
    } else {
        ws.write(Array.from(pantalonesEncontrados.array).join(" ") + "\n");
        ws.write(Array.from(pantalonesRestantes.array).join(" ") + "\n");
    }
	

	ws.end();
}