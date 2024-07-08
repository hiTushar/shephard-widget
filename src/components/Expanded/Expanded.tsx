import './Expanded.css';
import { PLATFORMS_ICON_MAP } from '../../assets/assets';
import { useMemo } from 'react';

interface Props {
  data: Array<object>;
  section: string;
}

const LEGEND_DATA:  Array<object> = [
  {
    name: 'Assets with Alerts',
    desc: '',
    color: 'rgb(208, 6, 6)'
  },
  {
    name: 'Assets with Aged Alerts',
    desc: '> 14 days',
    color: 'rgb(125, 17, 17)'
  },
  {
    name: 'Other Assets',
    desc: '',
    color: 'rgb(15, 68, 92)'
  }
]

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 10;
const LAST_ORBIT_RADIUS_PERCENTAGE = 65;

const Expanded:React.FC<Props> = ({ data, section }) => {
  
  const radiiArray: Array<number> = useMemo(() => {
    let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
    let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
    let radiusIncrement = (maxRadius - minRadius) / data.length;
    return LEGEND_DATA.map((_, idx) => minRadius + radiusIncrement * (idx + 1));
  }, [data]);

  const getLegend: Array<JSX.Element> = (data: Array<object>) => {
    return data.map((asset, idx) => {
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

  const getOrbits: Array<JSX.Element> = (totalDivisions: number) => {
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
  
  return (
    <div className="expanded">
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