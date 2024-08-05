import { AlertTypeData, LegendData } from "../../../Types";

const getOrbits = (legendData: Array<LegendData>, radiiArray: { [key: string]: number }): JSX.Element => {
    let orbitArray: Array<JSX.Element> = [];

    let maxOpacity = 0.5;
    let minOpacity = 0.1;
    let opacityDecrement = (maxOpacity - minOpacity) / legendData.length;

    for (let idx = 0; idx < legendData.length; idx++) {
        orbitArray.push(
            <circle
                cx="50"
                cy="51.5"
                r={radiiArray[legendData[idx].id]}
                stroke={`rgba(255, 255, 255, ${maxOpacity - opacityDecrement * idx})`}
                strokeWidth="0.2"
                fill="none"
                key={idx}
            />
        )
    }
    return (
        <svg width="100%" height="100%" viewBox='0 0 100 100'>
            {orbitArray}
        </svg>
    )
}

const getSpokes = (total: number, plotEndAngle: number): Array<JSX.Element> => {
    let spokeArray: Array<JSX.Element> = [];
    for (let idx = 0; idx < total; idx++) {
        // if(idx === 0 || idx === 4) continue
        spokeArray.push(
            <div
                className="grouped-spokes__item"
                key={idx}
                style={{ transform: `rotate(-${plotEndAngle / total * idx}deg)` }}
            >
            </div>
        )
    }
    return spokeArray;
}

const getLegend = (legendData: Array<AlertTypeData>): Array<JSX.Element> => {
    return legendData.map((alert: AlertTypeData, idx: number) => {
        return (
            <div
                className="grouped-legend__item"
                key={idx}
            >
                <div
                    className="grouped-item__color"
                    style={{ ...alert.dataPtStyle }}
                ></div>
                <div className="grouped-item__label">
                    <div className="grouped-label__name">{alert.name}</div>
                    {
                        alert.desc && <div className="grouped-label__desc">{alert.desc}</div>
                    }
                </div>
            </div>
        )
    })
}



export { getOrbits, getSpokes, getLegend }