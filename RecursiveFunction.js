/*Trabajas en un cine y un cliente quiere saber si tienes en cartelera una película que quiere ver.
Escribe una función que provea esta información.
INSTRUCCIONES
La función recibirá por parámetro un objeto de películas en cartelera, y también un string con la película que el cliente
desea ver.
Recursivamente debes buscar la película dentro del objeto y devolverla con el siguiente mensaje: "Si, tenemos la pelicula {nombreDeLaPelícula}"
Si la película no se encuentra, devolver el mensaje
"Actualmente no tenemos la pelicula".*/

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
    length = inputString.length - 1;

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Completa la función 'encontrarPelicula' a continuación.
 *
 * La función deberá retornar un STRING.
 * La función recibe por parámetro(s):
 *  1. OBJETO 'cartelera'
 *  2. STRING 'pelicula'
 *
 * No modifiques nada por fuera del cuerpo de la función.
 *
 * TIP: Puedes agregar default parameters a la función.
 */

function encontrarPelicula(cartelera, pelicula) {
    // Tu código aquí:
     for (const key in cartelera) {
    if (typeof cartelera[key] === "object") {
      const resultado = encontrarPelicula(cartelera[key], pelicula);
      if (resultado) {
        return resultado;
      }
    } else if (cartelera[key] === pelicula) {
      return `Si, tenemos la pelicula ${pelicula}`;
    }
  }
  return "Actualmente no tenemos la pelicula";
    

}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
	const encontrarPeliculaString = encontrarPelicula.toString();
	const ocurrences = encontrarPeliculaString.match(/encontrarPelicula/g).length;

	const cartelera = {};

	for (let i = 0; i < length; i++) {
		const item = readLine().trim();
		cartelera[i] = item;
	}

	const pelicula = readLine().trim();

	const result = encontrarPelicula(cartelera, pelicula);

	ocurrences > 1
		? ws.write(result + "\n")
		: ws.write("Debes utilizar recursión para la resolución de este ejercicio");

	ws.end();
}