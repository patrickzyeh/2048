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
                setGrid(newGrid);
                return newGrid;
            }
            return prevGrid;
        });
    }

    function handleKeyPress() {}

    useEffect(() => {
        addRandomTile();
        addRandomTile();
    }, []);

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
