class CellularAutomata {
    constructor(size, ctx) {
        this.size = size;
        this.ctx = ctx;
        this.cells = [];
    }

    create() {
        for (let x = 0; x < this.size; x++) {
            let row = [];
            for (let y = 0; y < this.size; y++) {
                const alive = Math.random() < 0.5;
                row.push(alive);

            }
            this.cells.push(row);
        }
    }

    next() {
        this.print();
        this.evaluate();
    }


    print() {
        this.ctx.clearRect(0, 0, this.size, this.size);
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.cells[x][y])
                    this.ctx.fillStyle = "black";
                else
                    this.ctx.fillStyle = "white";

                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    evaluate() {
        let cellsAux =
            new Array(100).fill("").map(() => new Array(100).fill(false))
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let livingNeighboor = 0;
                // 1
                if (x > 0 && y > 0)
                    if (this.cells[x - 1][y - 1])
                        livingNeighboor++;
                //2
                if (y > 0)
                    if (this.cells[x][y - 1])
                        livingNeighboor++;
                //3
                if (x < (this.size - 1) && y > 0)
                    if (this.cells[x + 1][y - 1])
                        livingNeighboor++;
                // 4
                if (x > 0)
                    if (this.cells[x - 1][y])
                        livingNeighboor++;
                //5
                if (x < (this.size - 1))
                    if (this.cells[x + 1][y])
                        livingNeighboor++;
                //6
                if (x > 0 && y < (this.size - 1))
                    if (this.cells[x + 1][y + 1])
                        livingNeighboor++;
                //7
                if (y < (this.size - 1))
                    if (this.cells[x][y + 1])
                        livingNeighboor++;
                //8
                if (x < (this.size - 1) && y < (this.size - 1))
                    if (this.cells[x + 1][y + 1])
                        livingNeighboor++;

                if (this.cells[x][y])
                    cellsAux[x][y] = livingNeighboor == 2 || livingNeighboor == 3 ? true : false;
                else
                    cellsAux[x][y] = livingNeighboor == 3 ? true : false;
            }
        }
        this.cells=cellsAux;
    }

}
const ctx = canvas.getContext('2d');
const cellularAutomata = new CellularAutomata(100, ctx)
cellularAutomata.create();
setInterval(()=>cellularAutomata.next(),100);