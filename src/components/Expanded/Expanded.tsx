import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Expanded.css';
import { addSvg, minusSvg } from '../../assets/assets';
import { inRadians, kbmFormatter } from '../../Utils/Utils';
import alertData from './Data/alertData.json';
import _ from 'lodash';
import AlertTypeData from '../alertTypeData.json';

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 10;
const LAST_ORBIT_RADIUS_PERCENTAGE = 43;
const PLOT_START_ANGLE: { [key: string]: number } = { 'orbit_a': 0, 'orbit_b': 20, 'orbit_c': 38 };
const PLOT_END_ANGLE = 360;
const DIVISIONS = 8;
const DATA_PT_MARGIN = 0.001; // percentage
const ORBIT_CENTER_OFFSET_LEFT = 50;
const ORBIT_CENTER_OFFSET_TOP = 52;

const Expanded: React.FC = () => {
  const { alertId, groupId } = useParams();

  // console.log(platformId, alertId, groupId);
  const [dataPts, setDataPts] = useState<{ [key: string]: Array<JSX.Element> }>({ 'orbit_a': [], 'orbit_b': [], 'orbit_c': [] });
  const [assetData, setAssetData] = useState<any>({ 'orbit_a': { 'data': [], 'meta': {} }, 'orbit_b': { 'data': [], 'meta': {} }, 'orbit_c': { 'data': [], 'meta': {} } });

  const radiiArray = useMemo(() => {
    let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
    let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
    let radiusIncrement = (maxRadius - minRadius) / 3;
    return Array.from({ length: 3 }, (_, idx) => minRadius + radiusIncrement * (idx + 1))
  }, [])

  useEffect(() => {
    fetchData();
  }, [alertId, groupId])

  const fetchData = () => {
    
    setAssetData({
      'orbit_a': alertData,
      'orbit_b': alertData,
      'orbit_c': alertData
    })

    renderData({
      'orbit_a': alertData,
      'orbit_b': alertData,
      'orbit_c': alertData
    })
  }

  const renderData = (datajson: any) => {
    console.log(datajson);
    Object.keys(dataPts).forEach((orbit, idx) => {
      getDataPoints(idx, orbit, datajson[orbit].data);
    })
  }

  const getDataPoints = (orbitIdx: number, orbit: string, data: Array<any>): void => {
    let dataPtSize = 3 / 100 + 2 * DATA_PT_MARGIN;
    let orbitRadius = radiiArray[orbitIdx];
    let orbitSize = 2 * Math.PI * orbitRadius; // relative to the container
    let sectionSize = orbitSize / data.length;
    sectionSize = sectionSize < dataPtSize ? dataPtSize : sectionSize;
    let angleIncrement = sectionSize / orbitSize * 360

    let minAngle = PLOT_START_ANGLE[orbit];
    let angleIncrementArray = [];
    for (let idx = 0; idx < data.length; idx++) {
      angleIncrementArray.push(minAngle + angleIncrement * idx);
    }

    let assetsDivArray = [];
    for (let idx = 0; idx < data.length; idx++) {
      let radialDistance = radiiArray[orbitIdx];
      let angularPos = angleIncrementArray[idx];

      let xPos = radialDistance * Math.cos(inRadians(angularPos));
      let yPos = radialDistance * Math.sin(inRadians(angularPos));

      assetsDivArray.push(
        <div
          className="expanded-dataPts__item"
          onMouseOver={() => { }}
          key={`${orbit}${idx}`}
          style={{
            left: `${ORBIT_CENTER_OFFSET_LEFT + xPos}%`,
            top: `${ORBIT_CENTER_OFFSET_TOP + yPos}%`,
            animationDelay: `${Math.random() * 2}s`,
            ...AlertTypeData.find(alert => alert.id === alertId)!.dataPtStyle
          }}
          onMouseEnter={() => { }}
          onClick={() => { }}
        >
        </div>
      )
    }
    console.log(assetsDivArray);
    setDataPts(prev => ({ ...prev, [orbit]: assetsDivArray }));
  }

  const getLegend = (alertId: string | undefined): JSX.Element => {
    let alert = AlertTypeData.find(asset => asset.id === alertId)!;
    return (
      <div
        className="expanded-legend__item"
      >
        <div
          className="expanded-item__color"
          data-asset-type={alertId}
        ></div>
        <div className="expanded-item__label">
          <div className="expanded-label__name">{alert.name}</div>
          {
            alert.desc && <div className="expanded-label__desc">{alert.desc}</div>
          }
        </div>
      </div>
    )
  }

  const getSpokes = (total: number, plotEndAngle: number): Array<JSX.Element> => {
    let spokeArray: Array<JSX.Element> = [];
    for (let idx = 0; idx < total; idx++) {
      // if(idx === 0 || idx === 4) continue
      spokeArray.push(
        <div
          className="expanded-spokes__item"
          key={idx}
          style={{
            transform: `rotate(-${plotEndAngle / total * idx}deg)`,
            ...AlertTypeData.find(alert => alert.id === alertId)!.spokeStyle
          }}
        >
        </div>
      )
    }
    return spokeArray;
  }

  const getOrbits = () => {
    let orbitArray: Array<JSX.Element> = [];

    let maxOpacity = 0.5;
    let minOpacity = 0.1;
    let opacityDecrement = (maxOpacity - minOpacity) / 3;

    for (let idx = 0; idx < 3; idx++) {
      orbitArray.push(
        <circle
          cx="50"
          cy="51.5"
          r={radiiArray[idx]}
          stroke="rgba(255, 255, 255)"
          strokeOpacity={`${maxOpacity - opacityDecrement * idx}`}
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

  const getOrigin = () => {
    let alert = AlertTypeData.find(asset => asset.id === alertId);
    return (
      <div className="expanded-system__centre"
        style={{
          ...alert!.originStyle
        }}
      >
        <div className="expanded-centre__count">
          {
            kbmFormatter(dataPts.orbit_a.length + dataPts.orbit_b.length + dataPts.orbit_c.length)
          }
        </div>
      </div>
    )

  }

  console.log(dataPts);
  return (
    <div className="expanded">
      <div className="expanded-orbit">
        <svg height="100%" width="100%" viewBox="0 0 100 100">
          <path
            d="M-50,70 Q50,35 150,70"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="0.5"
            strokeDasharray="1.15 1.5"
            fill="none"
          />
        </svg>
      </div>
      <div className="expanded-system">
        {
          getOrigin()
        }
        <div className="expanded-system__orbits">
          {
            getOrbits()
          }
        </div>
        <div className="expanded-system__spokes">
          {
            getSpokes(DIVISIONS, PLOT_END_ANGLE)
          }
        </div>
        <div className="expanded-system__dataPts">
          {
            dataPts.orbit_a
          }
          {
            dataPts.orbit_b
          }
          {
            dataPts.orbit_c
          }
        </div>
      </div>
      <div className="expanded-legend">
        {
          getLegend(alertId)
        }
      </div>
      <div className="expanded-pagination">
        <div className="expanded-pagination__button" onClick={() => { }}>
          <img src={addSvg} alt="add" />
        </div>
        <div className="expanded-pagination__button">
          <img src={minusSvg} alt="minus" />
        </div>
      </div>
    </div>
  )
}

export default Expanded;
