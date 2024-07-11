import './Overview.css';
import { PLATFORMS_ICON_MAP } from '../../assets/assets';
import { useMemo } from 'react';
import { inRadians, jumbleArray, kbmFormatter } from '../../Utils/Utils';

interface Props {
  data: Array<object>;
  setSection: Function;
}

interface Platform {
  platformId: string;
  platformName: string;
  platformAssets: PlatformAssets;
}

interface PlatformAssets {
  new_alerts: Array<Asset>;
  aged_alerts: Array<Asset>;
  other_assets: Array<Asset>;
}

interface Asset {
  machine_name: string;
  machine_uuid: string;
  group_name: string;
  group_uuid: string;
  group_type: string;
}

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 8;
const LAST_ORBIT_RADIUS_PERCENTAGE = 45;
const ORBIT_CENTER_OFFSET = 50;
const ORBIT_EDGE_ICON_GAP = 2;
const PLOT_START_ANGLE = 0;
const PLOT_END_ANGLE = 180;
const MIN_ICON_SIZE = 4;
const MAX_ICON_SIZE = 8;

const Overview: React.FC<Props> = ({ data, setSection }) => {

  const radiiArray: Array<number> = useMemo(() => {
    let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
    let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
    let radiusIncrement = (maxRadius - minRadius) / data.length;
    return data.map((_, idx) => minRadius + radiusIncrement * (idx + 1));
  }, [data]);

  const sectionAngleArray: Array<number> = useMemo(() => {
    let minAngle = PLOT_START_ANGLE;
    let maxAngle = PLOT_END_ANGLE;
    let angleIncrement = (maxAngle - minAngle) / data.length;
    return data.map((_, idx) => minAngle + angleIncrement * (idx)).concat(PLOT_END_ANGLE);
  }, [data])

  const getSpokes: Array<JSX.Element> = (totalDivisions: number) => {
    let spokeArray: Array<JSX.Element> = [];
    for (let idx = 0; idx <= totalDivisions; idx++) {
      spokeArray.push(
        <div
          className="overview-center__spoke"
          key={idx}
          style={{ transform: `rotate(-${PLOT_END_ANGLE / totalDivisions * idx}deg)` }}
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
      <svg viewBox='0 0 100 100' style={{ /* outline: '1px solid red' */ }}>
        {orbitArray}
      </svg>
    )
  }

  const getAlertCount: number = (data: Array<object>, platformId: string) => {
    let assets = data.find(platform => platform.platformId === platformId).platformAssets;
    let total = Object.keys(assets).reduce((acc, assetType) => acc + assets[assetType].length, 0);
    return total;
  }

  const getPlatformIcons: Array<JSX.Element> = (data: Array<object>) => {
    // let jumbledRadiiArray = jumbleArray([...radiiArray]); // to assign random orbit to platform icons, but the sector is still the same
    let alertCountArray = data.map((platform) => ({
      platformId: platform.platformId,
      assetCount: getAlertCount(data, platform.platformId)
    })).sort((a, b) => a.assetCount - b.assetCount);

    let minAssetCount = alertCountArray[0].assetCount;
    let maxAssetCount = alertCountArray[alertCountArray.length - 1].assetCount;
    let minOrbitRadiusIndex = 0;
    let maxOrbitRadiusIndex = data.length - 1;

    return data.map((platform, idx) => {
      let assetCount = alertCountArray.find(alert => alert.platformId === platform.platformId).assetCount;

      /**
       * Basic formula: 
       * (val - minVal) / (maxVal - minVal) = relativeVal
       */
      let relativeAssetCount = (assetCount - minAssetCount) / (maxAssetCount - minAssetCount);

      let iconSize = MIN_ICON_SIZE + (MAX_ICON_SIZE - MIN_ICON_SIZE) * relativeAssetCount;
      let orbitRadiusIndex = Math.round(minOrbitRadiusIndex + (maxOrbitRadiusIndex - minOrbitRadiusIndex) * relativeAssetCount);


      let orbitRadius = radiiArray[orbitRadiusIndex];
      let angularPosition = (sectionAngleArray[idx + 1] + sectionAngleArray[idx]) / 2;
      
      let xPosition = orbitRadius * Math.cos(inRadians(angularPosition));
      // if (xPosition + ORBIT_EDGE_ICON_GAP >= orbitRadius) {
      //   xPosition -= ORBIT_EDGE_ICON_GAP;
      // }
      // else if (xPosition - ORBIT_EDGE_ICON_GAP <= -orbitRadius) {
      //   xPosition += ORBIT_EDGE_ICON_GAP;
      // }

      let yPosition = orbitRadius * Math.sin(inRadians(angularPosition));
      return (
        <div
          className="overview-orbit__points"
          key={platform.platformId}
          style={{
            left: `${ORBIT_CENTER_OFFSET + xPosition}%`,
            top: `${ORBIT_CENTER_OFFSET - yPosition}%`,
            width: `${iconSize}cqw`,
          }}
          onClick={() => setSection(platform.platformId)}
        >
          <img src={PLATFORMS_ICON_MAP[platform.platformId]} alt={platform.platformName} />
          <div className="overview-points__val">{kbmFormatter(getAlertCount(data, platform.platformId))}</div>
        </div>
      )
    })
  }

  const getTotalAlertCount: string = (data: Array<object>) => {
    return data.reduce((acc, platform) => acc + getAlertCount(data, platform.platformId), 0).toString();
  }

  return (
    <div className="overview">
      <div className="overview-center">
        {
          getSpokes(data.length)
        }
        <div className='overview-center__total'>
          {
            kbmFormatter(getTotalAlertCount(data))
          }
          <br />
          ASSETS
        </div>
      </div>
      <div className="overview-orbit">
        {
          data.length && (
            getOrbits(data.length)
          )
        }
        {
          data.length && (
            getPlatformIcons(data)
          )
        }
      </div>
    </div>
  )
}

export default Overview;
