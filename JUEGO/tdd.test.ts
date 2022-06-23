let muestra1: number[][] = [
    [1, 1, 1],
    [0, 0, 1],
    [1, 0, 1]
  ];
   
  let resultado1: number[][] = [
    [0, 1, 1],
    [1, 0, 1],
    [0, 1, 0]
  ];
   
  import { JuegoDeLaVidaTDDBack } from '../JUEGO/index';
  
  test("Recupera número de vecinos", () => {
    let juego: JuegoDeLaVidaTDDBack = new JuegoDeLaVidaTDDBack(0, 0);
    juego.setMatriz(muestra1);
    expect(juego.calculaVecinosVivos(0, 0)).toBe(1);
    expect(juego.calculaVecinosVivos(1, 0)).toBe(3);
    expect(juego.calculaVecinosVivos(2, 0)).toBe(2);
    expect(juego.calculaVecinosVivos(2, 1)).toBe(3);
    expect(juego.calculaVecinosVivos(2, 2)).toBe(1);
  });
   
  test("Comprueba nueva generación", () => {
    let juego: JuegoDeLaVidaTDDBack = new JuegoDeLaVidaTDDBack(0, 0);
    juego.setMatriz(muestra1);
    let matrizResuelta: number[][] = juego.nuevaGeneracion();
   
    for (let fila = 0; fila < matrizResuelta.length; fila++) {
      for (let columna = 0; columna < matrizResuelta[fila].length; columna++) {
        console.log("Procesando fila " + fila + " columna " + columna);
        expect(matrizResuelta[fila][columna]).toBe(resultado1[fila][columna]);
      }
    }
  });