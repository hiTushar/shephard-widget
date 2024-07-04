import { useMemo } from 'react';
import { spokeSvg, rightSvg, dividerSvg } from '../../assets/assets.jsx';
import './Toolbar.css';

interface Props {
    data: Array<object>;
    section: string;
    setSection: Function;
}

interface Platform {
    platformId: string;
    platformName: string;
    platformAssets: Array<object>;
}

export const Toolbar: React.FC<Props> = ({ data, section, setSection }) => {

    const platforms = useMemo(() => {
        let temp = data.map((platformData) => ({
            [platformData.platformId]: platformData.platformName
        }));

        return [{ 'all': 'All' }, ...temp]
    }, [data])

    const changeTab = (platformId: string) => {
        setSection(platformId);
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
                            <>
                                <div
                                    className={`toolbar-tabs__item ${section === platformId ? 'active' : ''}`}
                                    onClick={() => changeTab(platformId)}
                                    key={platformId}
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
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
