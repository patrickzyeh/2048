export default function Tile({ value }) {
    // set color based on value

    return <div className={`tile tile-${value}`}>{value}</div>;
}
