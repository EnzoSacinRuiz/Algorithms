/*En un barrio se quieren construir nuevas casas, pero no estamos seguros de cuántas podremos construir según la cantidad de bolsas de cemento que se disponen.
Te pedimos que nos ayudes a crear una función que permita saber si se puede o no construir X cantidad de casas con N cantidad de bolsas de cemento.
INSTRUCCIONES
Teniendo en cuenta que con 10 bolsas de cemento se construye 1 casa, escribe una función que reciba por parámetro la cantidad de bolsas de cemento que disponemos.
Usando closures, esta función debe retornar una nueva función que acepte por parámetro la cantidad de casas que se quieren construir.
Finalmente esta función debe retornar:
• El string "Por favor ingresar cuantas casas quieres construir, si la cantidad de casas recibida por parámetro es 0 o menor
• El string "No se puede construir casas con esa cantidad de bolsas", si la cantidad de bolsas de cemento no alcanzan para 1 casa
• El string 'Solo puedes construir esta cantidad de casas: 1', si la cantidad de casas sobrepasa la cantidad de bolsas de cemento necesarias para
construirlas (ej: bolsas de cemento = 10 y casas = 2):
• El booleano true, si la cantidad de bolsas de cemento alcanza para construir las casas solicitadas.*/

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Completa la función 'construccionCasas' a continuación.
 *
 * La función recibe por parámetro un NÚMERO 'bolsas'.
 * La función debe retornar una nueva FUNCIÓN. Ésta, a su vez, recibe un NÚMERO por parámetro, y retorna un STRING.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */

function construccionCasas(bolsas) {
    // Tu código aquí
    return function(casas) {
    if (casas <= 0) {
      return "Por favor ingresar cuantas casas quieres construir";
    } else if (bolsas < 10) {
      return "No se puede construir casas con esa cantidad de bolsas";
    } else if (casas > Math.floor(bolsas / 10)) {
      return `Solo puedes construir esta cantidad de casas: ${Math.floor(bolsas / 10)}`;
    } else {
      return true;
    }
  };

}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const bolsas = parseInt(inputString[0]);
    const casas = parseInt(inputString[1]);
    
    
    const result = construccionCasas(bolsas)(casas);

    ws.write(result + '\n');

    ws.end();
}