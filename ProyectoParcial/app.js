//hadler
const piramide = document.querySelector('#response');

//Generamos números aleatorios entre un rango
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
    function generarPiramide() {
    const numFilaInput = document.getElementById('numRows');
    const numFilas = parseInt(numFilaInput.value, 10);
  
    // Rellenar la matriz con números aleatorios
    const pyramid = [];
    for (let i = 0; i < numFilas; i++) {
        const fila = [];
        for (let j = 0; j <= i; j++) {
        fila.push(numeroAleatorio(1,99));
        }
        pyramid.push(fila);
    }
    
//Eladio
    // Se calcula la suma de la ruta mayor
    let maxPath = [];
    let maxSum = 0;
    
    function sumaMaxRuta(fila, col, sumaActual, ruta) {
        if (fila === numFilas) {
            if (sumaActual > maxSum) {
              maxSum = sumaActual;
              maxPath = ruta.slice();
            }
            return;
        }
  
        const number = pyramid[fila][col];
        ruta.push([fila, col]);
  
        sumaMaxRuta(fila + 1, col, sumaActual + number, ruta.slice());
        sumaMaxRuta(fila + 1, col + 1, sumaActual + number, ruta.slice());
    }
    sumaMaxRuta(0, 0, 0, []);

//números de la ruta de mayor suma
    const maxPathElement = document.getElementById('maxPath');
    maxPathElement.innerHTML = maxPath.map(([fila, col]) => pyramid[fila][col]).join(' , ');

  //total suma
    const sumaMax = document.getElementById('maxSum');
    sumaMax.innerText = maxSum;

//Allan
// Piramide con la ruta resaltada
        let piramideHTML = '';
        for (let i = 0; i < numFilas; i++) {
            for (let j = 0; j <= i; j++) {
                const number = pyramid[i][j];
                const contar = maxPath.some(([fila, col]) => fila === i && col === j);
                piramideHTML += `<span class="${contar ? 'highlight' : ''}">${number}</span>`;
            }
            piramideHTML += '<br>';
        }
    
        piramide.innerHTML = piramideHTML;
}
  
const form = document.getElementById('refresh');
const form1 = document.getElementById('submit');
form.addEventListener('click', generarPiramide);
form1.addEventListener('click', generarPiramide);
generarPiramide(); // Generar la pirámide inicial
