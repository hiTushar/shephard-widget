import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { spokeSvg, rightSvg, dividerSvg } from '../../assets/assets';
import './Toolbar.css';
import { ToolbarProps } from '../../Types';

export const Toolbar: React.FC<ToolbarProps> = ({ data, section, setSection }) => {
    const navigate = useNavigate();

    const platforms = useMemo(() => {
        let temp = data.map((platformData) => ({
            [platformData.platformId]: platformData.platformName
        }));

        return [{ '': 'All' }, ...temp]
    }, [data])

    const changeTab = (platformId: string) => {
        setSection(platformId);
        navigate(`/${platformId}`);
    }

    return (
        <div className="toolbar">
            <div className="toolbar-glance">
                <div className="toolbar-glance__icon">
                    <img src={spokeSvg} alt="spoke" />
                </div>
                <div className='toolbar-glance__text'>
                    Assets at a glance
                </div>
                <div className="toolbar-glance__arrow">
                    <img src={rightSvg} alt="right" />
                </div>
            </div>
            <div className="toolbar-tabs">
                {
                    platforms.map((platformName, index) => {
                        const platformId = Object.keys(platformName)[0];
                        return (
                            <React.Fragment key={platformId}>
                                <div
                                    className={`toolbar-tabs__item ${section === platformId ? 'active' : ''}`}
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
