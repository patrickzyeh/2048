import { useState, useEffect } from "react";

import ScoreBox from "./components/ScoreBox";
import GameGrid from "./components/GameGrid";
import "./App.css";

function App() {
    const [grid, setGrid] = useState([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ]);
    const [score, setScore] = useState(0);

    function addRandomTile() {
        setGrid((prevGrid) => {
            // Find empty/availible tiles
            const emptyTiles = [];
            prevGrid.forEach((row, rowIndex) =>
                row.forEach((col, colIndex) => {
                    if (col === null) {
                        emptyTiles.push([rowIndex, colIndex]);
                    }
                })
            );

            // Chose and add random Tile (90% 2-tile, 10% 4-tile)
            if (emptyTiles.length > 0) {
                const tile = Math.floor(Math.random() * emptyTiles.length);
                const [row, col] = emptyTiles[tile];
                const newTileValue = Math.random() < 0.9 ? 2 : 4;

                const newGrid = [...prevGrid.map((innerArray) => [...innerArray])];
                newGrid[row][col] = newTileValue;
                return newGrid;
            }
            return prevGrid;
        });
    }

    function leftSlide(grid) {
        // reducing row
        const reducedGrid = [];
        grid.forEach((row) => {
            const reducedRow = row.filter((tile) => tile !== null);
            reducedGrid.push(reducedRow);
        });

        // merging row

        // padding row
        reducedGrid.forEach((row) => {
            const pad = 4 - row.length;
            for (let _ = 0; _ < pad; _++) {
                row.push(null);
            }
        });
        return reducedGrid;
    }

    function rightSlide(grid) {
        // reducing row
        const reducedGrid = [];
        grid.forEach((row) => {
            const reducedRow = row.filter((tile) => tile !== null);
            reducedGrid.push(reducedRow);
        });

        // merging row

        // padding row (need to append from the front)
        reducedGrid.forEach((row) => {
            const pad = 4 - row.length;
            for (let _ = 0; _ < pad; _++) {
                row.unshift(null);
            }
        });
        return reducedGrid;
    }

    function transpose(grid) {
        return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
    }

    function handleKeyPress(e) {
        const key = e.key;
        switch (key) {
            case "a":
                setGrid((oldGrid) => {
                    return leftSlide(oldGrid);
                });
                break;
            case "d":
                setGrid((oldGrid) => {
                    return rightSlide(oldGrid);
                });
                break;
            case "w":
                setGrid((oldGrid) => {
                    return transpose(leftSlide(transpose(oldGrid)));
                });
                break;
            case "s":
                setGrid((oldGrid) => {
                    return transpose(rightSlide(transpose(oldGrid)));
                });
                break;
        }
    }

    useEffect(() => {
        addRandomTile();
        addRandomTile();
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [grid]);

    return (
        <div id="game-container">
            <div id="header">
                <h1>2048</h1>
                <ScoreBox score={score} />
            </div>

            <p id="game-description">
                Use W-A-S-D to combine tiles to obtain the <b>2048</b> tile!
            </p>

            <GameGrid grid={grid} />
        </div>
    );
}

export default App;
