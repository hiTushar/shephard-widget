import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { spokeSvg, rightSvg, leftSvg, dividerSvg } from '../../assets/assets';
import './Toolbar.css';
import alertTypeData from '../alertTypeData.json';

const PLATFORM_DATA = [
    { platformId: 'linux', platformName: 'Linux' },
    { platformId: 'windows', platformName: 'Windows' },
    { platformId: 'macos', platformName: 'Mac' },
    { platformId: 'ios', platformName: 'iOS' },
    { platformId: 'android', platformName: 'Android' }
]

export const Toolbar: React.FC = () => {
    const [tab, setTab] = useState({ type: 'platform', platformId: 'all', alertId: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let pathArray = location.pathname.split('/').slice(1);
        if (pathArray.length === 1) {
            setTab({ type: 'platform', platformId: pathArray[0], alertId: '' });
        }
        else if (pathArray.length > 1) {
            setTab({ type: 'alert', platformId: pathArray[0], alertId: pathArray[1] });
        }
    }, [location.pathname])

    const platforms = useMemo(() => {
        let temp = PLATFORM_DATA.map((platformData) => ({
            [platformData.platformId]: platformData.platformName
        }));

        return [{ '': 'All' }, ...temp]
    }, [])

    const changeTab = (platformId: string) => {
        navigate(`/${platformId}`);
    }

    console.log('toolbar', tab);
    return (
        <div className="toolbar">
            <div className="toolbar-glance">
                {
                    tab.type === 'platform' && (
                        <>
                            <div className="toolbar-glance__icon">
                                <img src={spokeSvg} alt="spoke" />
                            </div>
                            <div className='toolbar-glance__text'>
                                Assets at a glance
                            </div>
                            <div className="toolbar-glance__arrow">
                                <img src={rightSvg} alt="right" />
                            </div>
                        </>
                    )
                }
                {
                    tab.type === 'alert' && (
                        <div className="toolbar-glance__alert-lvl" onClick={() => navigate(-1)}>
                            <div className="toolbar-alert-lvl__arrow">
                                <img src={leftSvg} alt="left" />
                            </div>
                            <div className="toolbar-alert-lvl__text">
                                <div className="toolbar-text__title">
                                    {alertTypeData.find(alert => alert.id === tab.alertId)!.name}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="toolbar-tabs">
                {
                    platforms.map((platformName, index) => {
                        const platformId = Object.keys(platformName)[0];
                        return (
                            <React.Fragment key={platformId}>
                                <div
                                    className={`toolbar-tabs__item ${tab.platformId === platformId ? 'active' : ''}`}
                                    onClick={() => changeTab(platformId)}
                                >
                                    {platformName[platformId]}
                                </div>
                                {
                                    index !== platforms.length - 1 && (
                                        <div className="toolbar-tabs__divider">
                                            <img src={dividerSvg} alt="divider" />
                                        </div>
                                    )
                                }
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}
