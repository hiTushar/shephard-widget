import './Expanded.css';
import { PLATFORMS_ICON_MAP } from '../../assets/assets';
import { useMemo, useState } from 'react';
import { inRadians } from '../../Utils/Utils';
import type { ExpandedProps, LegendData, Platform } from '../../Types';

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
const LAST_ORBIT_RADIUS_PERCENTAGE = 65;
const PLOT_START_ANGLE = 0;
const PLOT_END_ANGLE = 360;
const DIVISIONS = 8;
const DATA_PT_MARGIN = 0.001; // percentage
const ORBIT_CENTER_OFFSET_LEFT = 50;
const ORBIT_CENTER_OFFSET_TOP = 52;

const Expanded: React.FC<ExpandedProps> = ({ data, section }) => {
  const [dataPts, setDataPts] = useState<Array<JSX.Element>>([]);

  const sectionData = useMemo(() => {
    return data.find(platform => platform.platformId === section);
  }, [data, section])

  const radiiArray: Array<number> = useMemo(() => {
    let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
    let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
    let radiusIncrement = (maxRadius - minRadius) / data.length;
    return LEGEND_DATA.map((_, idx) => minRadius + radiusIncrement * (idx + 1));
  }, [data]);

  const getLegend = (legendData: Array<LegendData>): Array<JSX.Element> => {
    return legendData.map((asset, idx) => {
      return (
        <div
          className="expanded-legend__item"
          key={idx}
        >
          <div
            className="expanded-item__color"
            style={{ backgroundColor: asset.color }}
          ></div>
          <div className="expanded-item__label">
            <div className="expanded-label__name">{asset.name}</div>
            {
              asset.desc && <div className="expanded-label__desc">{asset.desc}</div>
            }
          </div>
        </div>
      )
    })
  }

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
          className="expanded-spokes__item"
          key={idx}
          style={{ transform: `rotate(-${PLOT_END_ANGLE / total * idx}deg)` }}
        >
        </div>
      )
    }
    return spokeArray;
  }

  const getDataPoints = (sectionData: Platform): void => {
    let containerSize = document.querySelector('.expanded')?.clientWidth;
    let dataPtSize = 3 / 100 + 2 * DATA_PT_MARGIN;

    let angleIncrementForAllOrbits: { [key: string]: number } = LEGEND_DATA.reduce((acc, dataType, idx) => {
      let orbitRadius = radiiArray[idx];
      let orbitSize = 2 * Math.PI * orbitRadius; // relative to the container
      let sectionSize = orbitSize / sectionData.platformAssets[dataType.id].length;
      sectionSize = sectionSize < dataPtSize ? dataPtSize : sectionSize;
      return { ...acc, [dataType.id]: sectionSize / orbitSize * 360 };
    }, {})

    console.log(containerSize, dataPtSize, angleIncrementForAllOrbits);

    let minAngle = PLOT_START_ANGLE;
    // let maxAngle = PLOT_END_ANGLE;
    let angleIncrementArrayForAllOrbits: { [key: string]: Array<number> } = Object.keys(angleIncrementForAllOrbits).reduce((acc, dataType) => {
      let angleIncrement = angleIncrementForAllOrbits[dataType];
      let angleIncrementArray = [];
      for (let idx = 0; idx < sectionData.platformAssets[dataType].length; idx++) {
        angleIncrementArray.push(minAngle + angleIncrement * idx);
      }
      return { ...acc, [dataType]: angleIncrementArray };
    }, {})

    console.log(angleIncrementArrayForAllOrbits);

    let allAssets = sectionData.platformAssets;
    let dataPtArray: Array<JSX.Element> = Object.keys(allAssets).reduce((acc: Array<JSX.Element>, dataType, idx) => {
      let assets = allAssets[dataType]
      let assetsDivArray = [];
      for (let jdx = 0; jdx < assets.length; jdx++) {
        // let asset = assets[jdx];
        let radialDistance = radiiArray[idx];
        let angularPos = angleIncrementArrayForAllOrbits[dataType][jdx];
        console.log(radialDistance, angularPos);

        let xPos = radialDistance * Math.cos(inRadians(angularPos));
        let yPos = radialDistance * Math.sin(inRadians(angularPos));
        assetsDivArray.push(
          <div
            className='expanded-dataPts__item'
            data-asset-type={dataType}
            onMouseOver={() => { }}
            key={`${dataType}${jdx}`}
            style={{
              left: `${ORBIT_CENTER_OFFSET_LEFT + xPos}%`,
              top: `${ORBIT_CENTER_OFFSET_TOP + yPos}%`,
            }}
            onMouseEnter={() => { }}
          >

          </div>
        )
      }
      return [...acc, ...assetsDivArray]
    }, [])
    setDataPts(dataPtArray);
  }

  return (
    <div className="expanded" onLoad={() => getDataPoints(sectionData!)}>
      <div className="expanded-orbit">
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
      <div className="expanded-system">
        <div className="expanded-system__centre">
          <img src={PLATFORMS_ICON_MAP[section]} alt={section} />
        </div>
        <div className='expanded-system__orbits'>
          {
            getOrbits(LEGEND_DATA.length)
          }
        </div>
        <div className="expanded-system__spokes">
          {
            getSpokes(DIVISIONS)
          }
        </div>
        <div className="expanded-system__dataPts">
          {
            dataPts
          }
        </div>
      </div>
      <div className="expanded-legend">
        {
          getLegend(LEGEND_DATA)
        }
      </div>
    </div>
  )
}

export default Expanded