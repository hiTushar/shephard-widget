import React, { useEffect, useRef, useState } from "react"
import _ from "lodash";
import { GroupAsset } from "../../Types"
import AlertTypeData from '../alertTypeData.json';
import './DetailModal.css'

const PATH_MAX_COORDS = { xMin: -50, xMax: 150, yMin: 0, yMax: 100 };

const DetailModal: React.FC<GroupAsset & { target?: HTMLDivElement, alertId?: string }> = (data) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentData, setCurrentData] = useState<GroupAsset & { target?: HTMLDivElement, alertId?: string }>();
    const modalRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        console.log('useEffect - ', data);
        if (!_.isEmpty(data)) {
            setIsOpen(true);
            setCurrentData({ ...data }); // to prevent data disappearing when hover is removed
        }
    }, [data])

    const handleAnimationEnd = () => {
        if (_.isEmpty(data)) {
            setIsOpen(false);
            setCurrentData({});
        }
    }

    const handleAnimationStart = () => {
        if (!_.isEmpty(data))
            drawLine(data);
    }

    const Section: React.FC<{ section: string, text: string }> = (data) => {
        return (
            <div className="section__container">
                <div className="container__title">
                    {data.section}
                </div>
                <div className="container__text">
                    {data.text}
                </div>
            </div>
        )
    }

    const drawLine = (data) => {
        let modalX = modalRef.current?.getBoundingClientRect().x!;
        let modalY = modalRef.current?.getBoundingClientRect().y!;
        let modalPosX = PATH_MAX_COORDS.xMin + (PATH_MAX_COORDS.xMax - PATH_MAX_COORDS.xMin) * modalX / window.innerWidth;
        let modalPosY = PATH_MAX_COORDS.yMin + (PATH_MAX_COORDS.yMax - PATH_MAX_COORDS.yMin) * modalY / window.innerHeight;

        lineRef.current?.setAttribute('d', `M ${data.xPos} ${data.yPos} L ${modalPosX} ${modalPosY}`);
        lineRef.current?.setAttribute('stroke', AlertTypeData.find(alert => alert.id === data!.alertId)!.dataPtStyle.backgroundColor);
    }

    console.log(isOpen, currentData);
    return (
        isOpen && (
            <div
                className={`detail-modal ${!_.isEmpty(data) ? 'mount-animation' : 'unmount-animation'}`}
                onAnimationEnd={handleAnimationEnd}
                onAnimationStart={handleAnimationStart}
            >
                <svg height="100%" width="100%" viewBox="0 0 100 100" style={{ border: '3px solid #0FF' }}>
                    <path fill="none" strokeWidth={0.4} strokeDasharray={1} ref={lineRef} />
                </svg>
                <div className="detail-modal__box" ref={modalRef}>
                    <Section section='Group' text={currentData!.group_name!} />
                    <Section section='ID' text={currentData!.group_uuid!} />
                    <Section section='Type' text={currentData!.group_type!} />
                    <Section section='Assets' text={currentData!.asset_count!} />
                </div>
            </div>
        )
    )
}

export default DetailModal;
