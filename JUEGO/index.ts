export class JuegoDeLaVidaTDDBack {
    matriz: number[][];
    dim = { columnas: 0, filas: 0 };
   
    constructor(columnas: number, filas: number) {
      this.dim.columnas = columnas;
      this.dim.filas = filas;
   
      this.matriz = this.inicializaMatriz(columnas, filas, true);
    }
   
    setMatriz(matriz: number[][]) {
      this.matriz = matriz;
   
      this.dim.filas = matriz.length;
      this.dim.columnas = matriz[0].length;
    }
   
    calculaVecinosVivos(columna: number, fila: number): number {
      let filaInicio: number = fila;
      let filaFin: number = fila;
      let columnaInicio: number = columna;
      let columnaFin: number = columna;
   
      let contador: number = 0;
   
      if (fila > 0) {
        filaInicio--;
      }
      if (fila < this.dim.filas - 1) {
        filaFin++;
      }
   
      if (columna > 0) {
        columnaInicio--;
      }
      if (columna < this.dim.columnas - 1) {
        columnaFin++;
      }
   
      for (let a = filaInicio; a <= filaFin; a++) {
        for (let b = columnaInicio; b <= columnaFin; b++) {
          if (fila == a && columna == b) {
            // ignorar la propia casilla
          } else {
            contador += this.matriz[a][b];
          }
        }
      }
      return contador;
    }
   
    inicializaMatriz(
      columnas: number,
      filas: number,
      aleatoria = true
    ): Array<Array<number>> {
      let matrizAux = new Array<Array<number>>();
   
      for (let fila = 0; fila < filas; fila++) {
        let filaArray: number[] = new Array<number>();
   
        for (let columna = 0; columna < columnas; columna++) {
          if (aleatoria == true) {
            filaArray.push(Math.round(Math.random() * 2));
          } else {
            filaArray.push(0);
          }
        }
   
        matrizAux.push(filaArray);
      }
   
      return matrizAux;
    }
   
    nuevaGeneracion() : Array<Array<number>>{
      let matrizAux: number[][] = this.inicializaMatriz(
        this.dim.columnas,
        this.dim.filas,
        false
      );
   
      for (let fila = 0; fila < this.dim.filas; fila++) {
        for (let columna = 0; columna < this.dim.columnas; columna++) {
          let vecinos: number = this.calculaVecinosVivos(columna, fila);
   
          if (this.matriz[fila][columna] == 0 && vecinos == 3) {
            matrizAux[fila][columna] = 1;
          } else if (
            this.matriz[fila][columna] == 1 &&
            (vecinos == 2 || vecinos == 3)
          ) {
            matrizAux[fila][columna] = 1;
          } else {
            matrizAux[fila][columna] = 0;
          }
        }
      }
   
      return matrizAux;
    }
  }
   
  export class JuegoDeLaVidaTDDFront {
    timer: any;
   
    color: string = "FFFFFF";
    tamaCuadrado: number = 5;
    ctx: CanvasRenderingContext2D;
    back: JuegoDeLaVidaTDDBack;
   
    constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
   
      this.back = new JuegoDeLaVidaTDDBack(
        this.ctx.canvas.width / this.tamaCuadrado,
        this.ctx.canvas.height / this.tamaCuadrado
      );
    }
   
    pintaCasilla(columna: number, fila: number, color: string) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(
        columna * this.tamaCuadrado + 1,
        fila * this.tamaCuadrado + 1,
        this.tamaCuadrado - 2,
        this.tamaCuadrado - 2
      );
    }
   
    consigueNuevaGeneracion() {
      this.back.matriz = this.back.nuevaGeneracion();
    }
   
    pinta() {
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
   
      for (let fila = 0; fila < this.back.dim.filas; fila++) {
        for (let columna = 0; columna < this.back.dim.columnas; columna++) {
          if (this.back.matriz[fila][columna] == 0) {
            this.color = "#FFFFFF";
          } else if (this.back.matriz[fila][columna] == 1) {
            this.color = "#0000FF";
          }
   
          this.pintaCasilla(fila, columna, this.color);
        }
      }
    }
   
    anima = () => {
      console.log("Animamos el juego");
      this.consigueNuevaGeneracion();
      this.pinta();
    };
  }
   
  window.addEventListener("load", main);
   
  function main() {
    let juego: JuegoDeLaVidaTDDFront;
   
    let micanvas: HTMLCanvasElement = document.getElementById(
      "areajuego"
    ) as HTMLCanvasElement;
   
    let ctx: CanvasRenderingContext2D | null = micanvas.getContext("2d");
   
    if (ctx == null) {
      console.log("Imposible recuperar contexto pintado");
      return;
    }
   
    juego = new JuegoDeLaVidaTDDFront(ctx);
    juego.timer = setInterval(juego.anima, 100);
  }