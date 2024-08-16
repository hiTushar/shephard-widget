import React, { useEffect, useRef, useState } from "react"
import _ from "lodash";
import { GroupAsset } from "../../Types"
import AlertTypeData from '../alertTypeData.json';
import './DetailModal.css'

const PATH_MAX_COORDS = { xMin: -50, xMax: 150, yMin: 10, yMax: 100 };

const DetailModal: React.FC<GroupAsset & { alertId?: string, xPos?: number, yPos?: number }> = (data) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentData, setCurrentData] = useState<GroupAsset & { alertId?: string, xPos?: number, yPos?: number }>();
    const modalRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
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

    const drawLine = (data: GroupAsset & { alertId?: string, xPos?: number, yPos?: number }) => {
        let modalX = modalRef.current?.getBoundingClientRect().x!;
        let modalY = modalRef.current?.getBoundingClientRect().y!;

        let strokeColor = AlertTypeData.find(alert => alert.id === data!.alertId)!.dataPtStyle.backgroundColor;
        let modalPosX = PATH_MAX_COORDS.xMin + (PATH_MAX_COORDS.xMax - PATH_MAX_COORDS.xMin) * modalX / window.innerWidth;
        let modalPosY = PATH_MAX_COORDS.yMin + (PATH_MAX_COORDS.yMax - PATH_MAX_COORDS.yMin) * modalY / window.innerHeight;

        // let P = Math.abs(data.yPos - modalPosY);
        // let B = Math.abs(data.xPos - modalPosX);
        // let theta = Math.atan(P / B);
        // console.log(theta * 180 / Math.PI);

        // let r = data.target.offsetWidth / 2;
        // let shiftX = r * Math.cos(theta);
        // let shiftY = r * Math.sin(theta);

        lineRef.current?.setAttribute('d', `M ${data.xPos! + 1} ${data.yPos! - 1} L ${modalPosX - 5} ${modalPosY} L ${modalPosX} ${modalPosY}`); // that +-1 is the approx correction make the line not overlap the digits, not going into trignometric calculations
        lineRef.current?.setAttribute('stroke', strokeColor);
    }

    const DrawBorder = () => {
        let accentColor = AlertTypeData.find(alert => alert.id === currentData!.alertId)!.dataPtStyle.backgroundColor;
        return (
            <>
                <div className="border-top" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent 30%)` }}></div>
                <div className="border-right" style={{ background: `linear-gradient(0deg, ${accentColor}, transparent 70%)` }}></div>
                <div className="border-bottom" style={{ background: `linear-gradient(270deg, ${accentColor}, transparent 30%)` }}></div>
                <div className="border-left" style={{ background: `linear-gradient(180deg, ${accentColor}, transparent 70%)` }}></div>
            </>
        )
    }

    return (
        isOpen && (
            <div
                className={`detail-modal ${!_.isEmpty(data) ? 'mount-animation' : 'unmount-animation'}`}
                onAnimationEnd={handleAnimationEnd}
                onAnimationStart={handleAnimationStart}
            >
                <svg height="100%" width="100%" viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodOpacity={0.3} floodColor={'#FFF'} />
                        </filter>
                    </defs>
                    <path fill="none" strokeWidth={0.4} strokeDasharray={1} ref={lineRef} filter="url(#shadow)" />
                </svg>
                <div className="detail-modal__box" ref={modalRef}>
                    <DrawBorder />
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
