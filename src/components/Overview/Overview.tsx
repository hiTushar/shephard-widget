import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Overview.css';
import { PLATFORMS_ICON_MAP } from '../../assets/assets';
import { inRadians, kbmFormatter } from '../../Utils/Utils';
import { Platform, PlatformAssets, AlertCountArray, ViewReducerInterface, DataStatusReducerInterface } from '../../Types';
import OverviewIcon from './OverviewIcon';
import { viewChange } from '../../redux/actions/viewActions';
import { changeDataStatus } from '../../redux/actions/dataStatusActions';
import ApiManager from '../../api/ApiManager';
import DataStatusScreen from '../DataStatus/DataStatus';

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 8;
const LAST_ORBIT_RADIUS_PERCENTAGE = 45;
const ORBIT_CENTER_OFFSET = 50;
const PLOT_START_ANGLE = 0;
const PLOT_END_ANGLE = 180;
const MIN_ICON_SIZE = 4;
const MAX_ICON_SIZE = 8;

const Overview: React.FC = () => {
  const [data, setData] = useState<Array<Platform>>([]);

  const dispatch = useDispatch();
  const view = useSelector((state: { viewReducer: ViewReducerInterface }) => state.viewReducer);
  const { dataStatus } = useSelector((state: { dataStatusReducer: DataStatusReducerInterface }) => state.dataStatusReducer);

  useEffect(() => {
    console.log('useEffect triggered');
    debugger;
    if (data.length === 0) { // to avoid reloading when component is re-mounted
      dispatch(changeDataStatus('LOADING'));
      console.log('data condition check');
      debugger;
      ApiManager.getOverviewData().then((apiData: {data: Array<Platform>}) => {
        console.log('promise fulfilled');
        debugger;
        if (apiData.data.length === 0) {
          setData([]);
          dispatch(changeDataStatus('EMPTY'));
        }
        else {
          setData(apiData.data);
          dispatch(changeDataStatus('OK'));
        }
      }).catch((e) => {
        console.log('Error fetching data', e);
        dispatch(changeDataStatus('ERROR'))
      });
    }
  }, [])

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

  const getSpokes = (totalDivisions: number): Array<JSX.Element> => {
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

  const getOrbits = (totalDivisions: number): JSX.Element => {
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
          strokeWidth="0.3"
          strokeDasharray="0.65 0.75"
          fill="none"
          key={idx}
        />
      )
    }
    return (
      <svg viewBox='0 0 100 100'>
        {orbitArray}
      </svg>
    )
  }

  const getAlertCount = (assets: PlatformAssets): number => {
    let total = Object.keys(assets).reduce((acc, assetType) => acc + assets[assetType], 0);
    return total;
  }

  const getAssetDistribution = (assets: PlatformAssets): { [key: string]: number } => {
    return {
      "new_alerts": assets.new_alerts,
      "aged_alerts": assets.aged_alerts,
      "other_assets": assets.other_assets
    }
  }

  const getPlatformIcons = (data: Array<Platform>): Array<JSX.Element> => {
    let alertCountArray: Array<AlertCountArray> = data.map((platform) => ({
      platformId: platform.platform_id,
      assetCount: getAlertCount(platform.platform_assets)
    })).sort((a, b) => a.assetCount - b.assetCount);

    let minAssetCount = alertCountArray[0].assetCount;
    let maxAssetCount = alertCountArray[alertCountArray.length - 1].assetCount;
    let minOrbitRadiusIndex = 0;
    let maxOrbitRadiusIndex = data.length - 1;

    return data.map((platform: Platform, idx: number) => {
      const { platform_id, platform_name, platform_assets } = platform;
      let assetCount = alertCountArray.find(alert => alert.platformId === platform_id)!.assetCount;

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
        <OverviewIcon
          leftOffset={ORBIT_CENTER_OFFSET + xPosition}
          topOffset={ORBIT_CENTER_OFFSET - yPosition}
          iconSize={iconSize}
          openIcon={() => openIcon(platform_id)}
          imgSrc={PLATFORMS_ICON_MAP[platform_id]}
          platformId={platform_id}
          platformName={platform_name}
          assetCount={getAlertCount(platform_assets)}
          assetDistribution={getAssetDistribution(platform_assets)}
          key={platform.platform_id}
        />
      )
    })
  }

  const getTotalAlertCount = (data: Array<Platform>): number => {
    return data.reduce((acc, platform) => acc + getAlertCount(platform.platform_assets), 0);
  }

  const openIcon = (platformId: string) => {
    dispatch(viewChange({ ...view, type: 'platform', platformId: platformId }));
  }

  return (
    dataStatus !== 'OK' ? (
      <DataStatusScreen status={dataStatus} />
    ) : (
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
  )
}

export default Overview;
