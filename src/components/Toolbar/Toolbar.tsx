import React, { useMemo } from 'react';
import { spokeSvg, rightSvg, leftSvg, dividerSvg } from '../../assets/assets';
import './Toolbar.css';
import alertTypeData from '../alertTypeData.json';
import { useDispatch, useSelector } from 'react-redux';
import { viewChange } from '../../redux/actions/viewActions';
import { DataStatusReducerInterface, ViewReducerInterface } from '../../Types';

const PLATFORM_DATA = [
    { platformId: 'linux', platformName: 'Linux' },
    { platformId: 'windows', platformName: 'Windows' },
    { platformId: 'macos', platformName: 'Mac' },
    { platformId: 'ios', platformName: 'iOS' },
    { platformId: 'android', platformName: 'Android' }
]

export const Toolbar: React.FC = () => {
    const dispatch = useDispatch();
    const view = useSelector((state: { viewReducer: ViewReducerInterface }) => state.viewReducer);
    const { dataStatus } = useSelector((state: { dataStatusReducer: DataStatusReducerInterface }) => state.dataStatusReducer);

    const platforms = useMemo(() => {
        let temp = PLATFORM_DATA.map((platformData) => ({
            [platformData.platformId]: platformData.platformName
        }));

        return [{ 'all': 'All' }, ...temp]
    }, [])

    const changeTab = (platformId: string) => {
        dispatch(viewChange({ ...view, type: 'platform', platformId: platformId }));
    }

    const exitAlertView = () => {
        dispatch(viewChange({ type: 'platform', platformId: view.platformId, alertId: '', groupId: '' }));
    }

    return (
        dataStatus === 'LOADING' ? (
            <></>
        ) : (
            <div className="toolbar">
                <div className="toolbar-glance">
                    {
                        view.type === 'platform' && (
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
                        view.type === 'alert' && (
                            <div className="toolbar-glance__alert-lvl" onClick={exitAlertView}>
                                <div className="toolbar-alert-lvl__arrow">
                                    <img src={leftSvg} alt="left" />
                                </div>
                                <div className="toolbar-alert-lvl__text">
                                    <div className="toolbar-text__title">
                                        {alertTypeData.find(alert => alert.id === view.alertId)!.name}
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
                                        className={`toolbar-tabs__item ${view.platformId === platformId ? 'active' : ''}`}
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
    )
}
