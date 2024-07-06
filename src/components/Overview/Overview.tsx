import './Overview.css';
import { appleSvg, androidSvg, windowsSvg, linuxSvg } from '../../assets/assets';
import { useMemo } from 'react';

interface Props {
  data: Array<object>;
  setSection: Function;
}

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 8;
const LAST_ORBIT_RADIUS_PERCENTAGE = 45;
const ORBIT_CENTER_OFFSET = 50;
const ORBIT_EDGE_ICON_GAP = 5;

const PLATFORMS_ICON_MAP: object = {
  'macos': appleSvg,
  'ios': appleSvg,
  'android': androidSvg,
  'windows': windowsSvg,
  'linux': linuxSvg
}

const Overview: React.FC<Props> = ({ data, setSection }) => {

  const radiiArray: Array<number> = useMemo(() => {
    let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
    let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
    let radiusIncrement = (maxRadius - minRadius) / data.length;
    return data.map((_, idx) => minRadius + radiusIncrement * (idx + 1));
  }, [data]);

  const getSpokes: Array<JSX.Element> = (totalDivisions: number) => { 
    let spokeArray: Array<JSX.Element> = [];
    for (let idx = 0; idx <= totalDivisions; idx++) {
      spokeArray.push(
        <div
          className="overview-center__spoke"
          key={idx}
          style={{ transform: `rotate(-${180 / totalDivisions * idx}deg) ` }}
        >
        </div>
      )
    }
    return spokeArray;
  }

  const getOrbits: Array<JSX.Element> = (totalDivisions: number) => {
    let orbitArray: Array<JSX.Element> = [];

    let maxOpacity = 1;
    let minOpacity = 0.1;
    let opacityDecrement = (maxOpacity - minOpacity) / totalDivisions;

    for (let idx = 0; idx <= totalDivisions; idx++) {
      orbitArray.push(
        <circle
          cx="50"
          cy="50"
          r={radiiArray[idx]}
          stroke={`rgba(255, 255, 255, ${maxOpacity - opacityDecrement * idx})`}
          stroke-width="0.3"
          stroke-dasharray="0.65 0.75"
          fill="none"
        />
      )
    }
    return (
      <svg viewBox='0 0 100 100' style={{ outline: '1px solid red' }}>
        {orbitArray}
      </svg>
    )
  }

  // TODO: x y offsets change to give revolving effect
  const getPlatformIcons: Array<JSX.Element> = (data: Array<object>) => {
    return data.map((platform, idx) => {
      let orbitRadius = radiiArray[idx];
      let xOffset = -orbitRadius + Math.random() * orbitRadius * 2;
      console.log(xOffset);
      if(xOffset + ORBIT_EDGE_ICON_GAP >= orbitRadius) {
        xOffset -= ORBIT_EDGE_ICON_GAP;
      }
      else if(xOffset - ORBIT_EDGE_ICON_GAP <= -orbitRadius) {
        xOffset += ORBIT_EDGE_ICON_GAP;
      }

      let yOffset = Math.sqrt(Math.pow(orbitRadius, 2) - Math.pow(xOffset, 2));
      return (
        <div 
          className="overview-orbit__points"
          key={platform.platformId}
          style={{ 
            left: `${ORBIT_CENTER_OFFSET + xOffset}%`, 
            top: `${ORBIT_CENTER_OFFSET - yOffset}%`, 
          }}
          onClick={() => setSection(platform.platformId)}
        >
          <img src={PLATFORMS_ICON_MAP[platform.platformId]} alt={platform.platformName} />
          <div className="overview-points__val">31231234</div>
        </div>
      )  
    })
  }

  return (
    <div className="overview">
      <div className="overview-center">
        {
          getSpokes(data.length)
        }
      </div>
      <div className="overview-orbit">
        {
          getOrbits(data.length)
        }
        {
          getPlatformIcons(data)
        }
      </div>
    </div>
  )
}

export default Overview;
