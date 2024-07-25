import { useMemo, useState } from "react";
import './Grouped.css';
import { GroupedProps, LegendData } from "../../Types";
import newAlertDataJson from "./Data/newAlertData.json";
import agedAlertDataJson from "./Data/agedAlertData.json";
import noAlertDataJson from "./Data/noAlertData.json";
import { PLATFORMS_ICON_MAP } from "../../assets/assets";

const LEGEND_DATA: Array<LegendData> = [
    {
        id: 'new_alerts',
        name: 'Assets with Alerts',
        desc: '',
        color: 'rgb(208, 6, 6)'
    },
    {
        id: 'aged_alerts',
        name: 'Assets with Aged Alerts',
        desc: '> 14 days',
        color: 'rgb(125, 17, 17)'
    },
    {
        id: 'other_assets',
        name: 'Other Assets',
        desc: '',
        color: 'rgb(15, 68, 92)'
    }
]

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 10;
const LAST_ORBIT_RADIUS_PERCENTAGE = 40;
const PLOT_START_ANGLE = 0;
const PLOT_END_ANGLE = 360;
const DIVISIONS = 8;
const DATA_PT_MARGIN = 0.001; // percentage
const ORBIT_CENTER_OFFSET_LEFT = 50;
const ORBIT_CENTER_OFFSET_TOP = 52;

const Grouped: React.FC<GroupedProps> = ({ section }) => {
    const [dataPts, setDataPts] = useState<Array<JSX.Element>>([]);
    const [newAlertData, setNewAlertData] = useState(newAlertDataJson);
    const [agedAlertData, setAgedAlertData] = useState(agedAlertDataJson);
    const [noAlertData, setNoAlertData] = useState(noAlertDataJson);

    const radiiArray: Array<number> = useMemo(() => {
        let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
        let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
        let radiusIncrement = (maxRadius - minRadius) / LEGEND_DATA.length;
        return LEGEND_DATA.map((_, idx) => minRadius + radiusIncrement * (idx + 1));
    }, []);

    const getOrbits = (totalDivisions: number): JSX.Element => {
        let orbitArray: Array<JSX.Element> = [];

        let maxOpacity = 0.5;
        let minOpacity = 0.1;
        let opacityDecrement = (maxOpacity - minOpacity) / totalDivisions;

        for (let idx = 0; idx <= totalDivisions; idx++) {
            orbitArray.push(
                <circle
                    cx="50"
                    cy="51.5"
                    r={radiiArray[idx]}
                    stroke={`rgba(255, 255, 255, ${maxOpacity - opacityDecrement * idx})`}
                    stroke-width="0.2"
                    fill="none"
                />
            )
        }
        return (
            <svg width="100%" height="100%" viewBox='0 0 100 100' style={{ outline: '1px solid red' }}>
                {orbitArray}
            </svg>
        )
    }

    const getSpokes = (total: number): Array<JSX.Element> => {
        let spokeArray: Array<JSX.Element> = [];
        for (let idx = 0; idx < total; idx++) {
          // if(idx === 0 || idx === 4) continue
          spokeArray.push(
            <div
              className="grouped-spokes__item"
              key={idx}
              style={{ transform: `rotate(-${PLOT_END_ANGLE / total * idx}deg)` }}
            >
            </div>
          )
        }
        return spokeArray;
    }

    const getLegend = (legendData: Array<LegendData>): Array<JSX.Element> => {
        return legendData.map((asset, idx) => {
            return (
                <div
                    className="grouped-legend__item"
                    key={idx}
                >
                    <div
                        className="grouped-item__color"
                        style={{ backgroundColor: asset.color }}
                    ></div>
                    <div className="grouped-item__label">
                        <div className="grouped-label__name">{asset.name}</div>
                        {
                            asset.desc && <div className="grouped-label__desc">{asset.desc}</div>
                        }
                    </div>
                </div>
            )
        })
    }

    const getDataPoints = (): void => {

    }

    return (
        <div className="grouped" onLoad={() => getDataPoints()}>
            <div className="grouped-orbit">
                <svg height="100%" width="100%" viewBox="0 0 100 100">
                    <path
                        d="M-50,70 Q50,35 150,70"
                        stroke="rgba(255, 255, 255, 0.3)"
                        stroke-width="0.5"
                        stroke-dasharray="1.15 1.5"
                        fill="none"
                    />
                </svg>
            </div>
            <div className="grouped-system">
                <div className="grouped-system__centre">
                    <img src={PLATFORMS_ICON_MAP[section]} alt={section} />
                </div>
                <div className='grouped-system__orbits'>
                    {
                        getOrbits(LEGEND_DATA.length)
                    }
                </div>
                <div className="grouped-system__spokes">
                    {
                        getSpokes(DIVISIONS)
                    }
                </div>
                <div className="grouped-system__dataPts">
                    {
                        dataPts
                    }
                </div>
            </div>
            <div className="grouped-legend">
                {
                    getLegend(LEGEND_DATA)
                }
            </div>
        </div>
    )
}

export default Grouped;
