import Tile from "./Tile";

export default function GameGrid({ grid }) {
    return (
        <div id="game-grid">
            {grid.map((row, rowIndex) => row.map((col, colIndex) => <Tile key={`${rowIndex},${colIndex}`} value={grid[rowIndex][colIndex]} />))}
        </div>
    );
}
