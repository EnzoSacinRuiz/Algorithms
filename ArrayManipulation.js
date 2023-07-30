/*En nuestra tienda de indumentaria hay muchos clientes que esperan a ser atendidos.
Crea una función que atienda y elimina a los clientes de la
fila.
INSTRUCCIONES
Escribir una función que reciba por parámetro un objeto de clientes que estarán esperando ser atendidos.
Recursivamente debes eliminar los clientes hasta deiar el objeto vacio y finalmente devolverlo.*/

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


/*
 * Completa la función 'atenderClientes' a continuación.
 *
 * La función debe retornar un OBJETO.
 * La función recibe un OBJETO 'clientes' por parámetro.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 *
 * TIP: Puedes agregar default parameters a la función.
 */

function atenderClientes(clientes) {
    // Tu código aquí:
     for (const key in clientes) {
    if (typeof clientes[key] === "object") {
      atenderClientes(clientes[key]);
    } else {
      delete clientes[key];
    }
  }
  return clientes;
    

}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const atenderClientesString = atenderClientes.toString();
    const ocurrences = atenderClientesString.match(/atenderClientes/g).length;

    let clientes = [];

    for (let i = 0; i < length; i++) {
        const clientesItem = readLine();
        clientes.push(clientesItem);
    }

    const result = atenderClientes(clientes);
    
    let finallyResult = [];
    
    if(Array.isArray(result)) {
        for(let i = 0; i < result.length; i++){
            finallyResult.push(result[i])
        }
    }
    
    ocurrences > 1 
        ? ws.write(typeof result === 'object' && Object.keys(result).length === 0 ? '{}' : finallyResult.join('\n') + '\n')
        : ws.write("Debes utilizar recursión para la resolución de este ejercicio")

    ws.end();
}