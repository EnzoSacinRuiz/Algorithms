/*En el bar donde trabajas, el sistema de registro está caído.
Necesitan que crees una función que permita ordenar los pedidos de los clientes para poder preparar sus bebidas.
INSTRUCCIONES
La función recibe por parámetro un arreglo de objetos, en el que cada objeto tiene una propiedad nombre (string), y luna propiedad pedido que es a su vez un objeto (con propiedades nombre (string) y precio (numero) del trago).
Debes ordenar la lista de clientes a partir del precio de los tragos (del más barato al más caro), y retornar el arreglo ordenado.*/

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
 * Completa la función 'odernarPedidos' a continuación.
 *
 * La función debe retornar un ARREGLO DE OBJETOS.
 * La función recibe un ARREGLO DE OBJETOS 'pedidos' por parámetro.
 *
 * No modifiques nada por fuera del cuerpo de la función.
 */

function ordenarPedidos(pedidos) {
    // Tu código aquí:
    for (let i = 0; i < pedidos.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < pedidos.length; j++) {
      if (pedidos[j].pedido.precio < pedidos[minIndex].pedido.precio) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = pedidos[i];
      pedidos[i] = pedidos[minIndex];
      pedidos[minIndex] = temp;
    }
  }
  return pedidos;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const forbiddenMethods = [".sort"];
    const ordenarPedidosString = ordenarPedidos.toString();
    
    let usingForbidenMethods = false;
    
    forbiddenMethods.forEach(method => {
        if (ordenarPedidosString.includes(method)) usingForbidenMethods = true;
    });
    
    let pedidos = [];
    
    let pedidoA = {};
    let pedidoB = {};
    let pedidoC = {};
    let pedidoD = {};
    
    for (let i = 0; i < length; i += 3) {
        if (i < 3) {
            pedidoA.nombre = inputString[0];
            pedidoA.pedido = { bebida: inputString[1], precio: inputString[2] };
            pedidos.push(pedidoA)
        } else if (i < 6) {
            pedidoB.nombre = inputString[3];
            pedidoB.pedido = { bebida: inputString[4], precio: inputString[5] };
            pedidos.push(pedidoB)
        } else if (i < 9) {
            pedidoC.nombre = inputString[6];
            pedidoC.pedido = { bebida: inputString[7], precio: inputString[8] };
            pedidos.push(pedidoC)
        } else if (i < 12) {
            pedidoD.nombre = inputString[9];
            pedidoD.pedido = { bebida: inputString[10], precio: inputString[11] };
            pedidos.push(pedidoD)
        } else break;
    }

    const result = ordenarPedidos(pedidos);
    
    let finallyResult = [];
    
    for(let i = 0; i < result.length; i++){
        finallyResult.push(result[i].nombre);
        finallyResult.push(result[i].pedido.bebida);
        finallyResult.push(result[i].pedido.precio);
    }
}   
    usingForbidenMethods ? ws.write("No está permitido usar el método .sort() de arrays") : ws.write(finallyResult.join('\n') + '\n');
    
    ws.end();