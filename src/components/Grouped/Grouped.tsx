import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _ from 'lodash';
import './Grouped.css';
import { alertGroupInterface, GroupPtsInterface, GroupAsset, GroupedInterface, GroupedProps, LegendData, metaInterface } from "../../Types";
import newAlertJson from "./Data/newAlertData.json";
import agedAlertJson from "./Data/agedAlertData.json";
import noAlertJson from "./Data/noAlertData.json";
import { addSvg, minusSvg, PLATFORMS_ICON_MAP } from "../../assets/assets";
import { inRadians, kbmFormatter } from "../../Utils/Utils";
import { getLegend, getOrbits, getSpokes } from "./Utils/render";
import AlertTypeData from '../alertTypeData.json';

// const AlertTypeData: Array<LegendData> = [
//     {
//         id: 'new_alerts',
//         name: 'Assets with Alerts',
//         desc: '',
//         color: 'rgb(208, 6, 6)'
//     },
//     {
//         id: 'aged_alerts',
//         name: 'Assets with Aged Alerts',
//         desc: '> 14 days',
//         color: 'rgb(125, 17, 17)'
//     },
//     {
//         id: 'no_alerts',
//         name: 'Assets with No Alerts',
//         desc: '',
//         color: 'rgb(15, 68, 92)'
//     }
// ]

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 10;
const LAST_ORBIT_RADIUS_PERCENTAGE = 43;
const PLOT_START_ANGLE: { [key: string]: number } = { 'new_alerts': 0, 'aged_alerts': 20, 'no_alerts': 38 };
const PLOT_END_ANGLE = 360;
const DIVISIONS = 8;
const DATA_PT_MARGIN = 0.001; // percentage
const ORBIT_CENTER_OFFSET_LEFT = 50;
const ORBIT_CENTER_OFFSET_TOP = 52;
const NEW_ALERT_LIMIT_PER_ORBIT = 10;
const AGED_ALERT_LIMIT_PER_ORBIT = 18;
const NO_ALERT_LIMIT_PER_ORBIT = 30;

const Grouped: React.FC = () => {
    const [dataPts, setDataPts] = useState<GroupPtsInterface>({ 'new_alerts': [], 'aged_alerts': [], 'no_alerts': [] });
    const [groupedData, setGroupedData] = useState<GroupedInterface>({ 'new_alerts': { 'data': [], 'meta': {} }, 'aged_alerts': { 'data': [], 'meta': {} }, 'no_alerts': { 'data': [], 'meta': {} } });
    const [pageControl, setPageControl] = useState<{[key: string]: Boolean}>({ forward: true, backward: false });

    const { platformId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [platformId]);

    const fetchData = (): void => {
        let currentNewAlertJson: alertGroupInterface = groupedData.new_alerts, 
        currentAgedAlertJson: alertGroupInterface  = groupedData.aged_alerts,  
        currentNoAlertJson: alertGroupInterface = groupedData.no_alerts;

        if (_.isEmpty(currentNewAlertJson.data) || groupedData.new_alerts.meta.currentPage! < groupedData.new_alerts.meta.totalPages!) {   
            currentNewAlertJson = {...newAlertJson}; 
        }
        if (_.isEmpty(currentAgedAlertJson.data) || groupedData.aged_alerts.meta.currentPage! < groupedData.aged_alerts.meta.totalPages!) {
            currentAgedAlertJson = {...agedAlertJson};
        }
        if (_.isEmpty(currentNoAlertJson.data) || groupedData.no_alerts.meta.currentPage! < groupedData.no_alerts.meta.totalPages!) {
            currentNoAlertJson = {...noAlertJson};
        }

        if(currentNewAlertJson.meta.currentPage === currentNewAlertJson.meta.totalPages && currentAgedAlertJson.meta.currentPage === currentAgedAlertJson.meta.totalPages && currentNoAlertJson.meta.currentPage === currentNoAlertJson.meta.totalPages) {
            setPageControl({ forward: false, backward: true });
        }
        else if(currentNewAlertJson.meta.currentPage === 1 && currentAgedAlertJson.meta.currentPage === 1 && currentNoAlertJson.meta.currentPage === 1) {
            setPageControl({ forward: true, backward: false });
        }
        else if(currentNewAlertJson.meta.totalPages === 1 && currentAgedAlertJson.meta.totalPages === 1 && currentNoAlertJson.meta.totalPages === 1) {
            setPageControl({ forward: false, backward: false });
        }
        else {
            setPageControl({ forward: true, backward: true });
        }

        setGroupedData({
            'new_alerts': currentNewAlertJson,
            'aged_alerts': currentAgedAlertJson,
            'no_alerts': currentNoAlertJson
        })

        renderData({
            'new_alerts': currentNewAlertJson,
            'aged_alerts': currentAgedAlertJson,
            'no_alerts': currentNoAlertJson
        });
    }

    const radiiArray: { [key: string]: number } = useMemo(() => {
        let minRadius = CENTER_CIRCLE_RADIUS_PERCENTAGE;
        let maxRadius = LAST_ORBIT_RADIUS_PERCENTAGE;
        let radiusIncrement = (maxRadius - minRadius) / AlertTypeData.length;
        return AlertTypeData.reduce((all, current, idx) => {
            return { ...all, [current.id]: minRadius + radiusIncrement * (idx + 1) }
        }, {})
    }, []);

    const renderData = ( groupedDataJson: GroupedInterface ): void => {
        AlertTypeData.forEach(alertType => {
            getDataPoints(alertType.id, groupedDataJson[alertType.id].data);
        })
    }

    const getDataPoints = (alertId: string, groupedData: Array<GroupAsset>): void => {
        let groupedAssets = groupedData;
        let dataPtSize = 3 / 100 + 2 * DATA_PT_MARGIN;

        let orbitRadius = radiiArray[alertId];
        let orbitSize = 2 * Math.PI * orbitRadius; // relative to the container
        let sectionSize = orbitSize / groupedAssets.length;
        sectionSize = sectionSize < dataPtSize ? dataPtSize : sectionSize;
        let angleIncrement = sectionSize / orbitSize * 360

        let minAngle = PLOT_START_ANGLE[alertId];
        let angleIncrementArray = [];
        for (let idx = 0; idx < groupedAssets.length; idx++) {
            angleIncrementArray.push(minAngle + angleIncrement * idx);
        }


        let assetsDivArray = [];
        for (let idx = 0; idx < groupedAssets.length; idx++) {
            let radialDistance = radiiArray[alertId];
            let angularPos = angleIncrementArray[idx];

            let xPos = radialDistance * Math.cos(inRadians(angularPos));
            let yPos = radialDistance * Math.sin(inRadians(angularPos));

            assetsDivArray.push(
                <div
                    className={`grouped-dataPts__item ${+groupedAssets[idx].asset_count! === 1 ? 'single' : ''}`}
                    data-asset-type={alertId}
                    onMouseOver={() => { }}
                    key={`${alertId}${idx}`}
                    style={{
                        left: `${ORBIT_CENTER_OFFSET_LEFT + xPos}%`,
                        top: `${ORBIT_CENTER_OFFSET_TOP + yPos}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                    onMouseEnter={() => { }}
                    onClick={() => openExpandedView(alertId, groupedAssets[idx].group_uuid!)}
                >
                    {+groupedAssets[idx].asset_count! > 1 && kbmFormatter(+groupedAssets[idx].asset_count!)}
                </div>
            )
        }

        setDataPts(prev => ({ ...prev, [alertId]: assetsDivArray }));
    }

    const openExpandedView = (alertId: string, groupId: string) => {
        navigate(`/${platformId}/${alertId}/${groupId}`);
    }

    return (
        <div className="grouped">
            <div className="grouped-orbit">
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
            <div className="grouped-system">
                <div className="grouped-system__centre">
                    <img src={PLATFORMS_ICON_MAP[platformId || '']} alt={platformId} />
                </div>
                <div className='grouped-system__orbits'>
                    {
                        getOrbits(AlertTypeData, radiiArray)
                    }
                </div>
                <div className="grouped-system__spokes">
                    {
                        getSpokes(DIVISIONS, PLOT_END_ANGLE)
                    }
                </div>
                <div className="grouped-system__dataPts">
                    {
                        dataPts.new_alerts
                    }
                    {
                        dataPts.aged_alerts
                    }
                    {
                        dataPts.no_alerts
                    }
                </div>
            </div>
            <div className="grouped-legend">
                {
                    getLegend(AlertTypeData)
                }
            </div>
            <div className="grouped-pagination">
                <div className="grouped-pagination__button" onClick={() => { }}>
                    <img src={addSvg} alt="add" />
                </div>
                <div className="grouped-pagination__button">
                    <img src={minusSvg} alt="minus" />
                </div>
            </div>
        </div>
    )
}

export default Grouped;
