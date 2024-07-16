import { useEffect, useRef, useState } from "react";
import { OverviewIconProps } from "../../Types"
import { kbmFormatter } from "../../Utils/Utils";
import './OverviewIcon.css';

const OverviewIcon: React.FC<OverviewIconProps> = (props) => {
  const { leftOffset, topOffset, iconSize, openIcon, imgSrc, platformName, assetCount } = props;
  const [spots, setSpots] = useState<Array<Object>>([]);
  const iconRef = useRef<HTMLDivElement>(null);

  const generateSpots = () => {
    const canvas: HTMLCanvasElement = iconRef.current!.querySelector('.overview-icon__canvas canvas')!;
    canvas.width = iconRef.current!.querySelector<HTMLElement>('.overview-icon__canvas')!.offsetWidth;
    canvas.height = iconRef.current!.querySelector<HTMLElement>('.overview-icon__canvas')!.offsetHeight;

    const iconSize = iconRef.current!.querySelector<HTMLElement>('.overview-icon__logo')!.offsetWidth;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      let circleRadius = Math.random() * (canvas.width / 10 - canvas.width / 20) + canvas.width / 20;
      let radialDistance = (Math.random() * (canvas.width / 2 - iconSize / 2) + iconSize / 2) + circleRadius;
      let angle = Math.random() * 2 * Math.PI;
      let x = canvas.width / 2 - radialDistance * Math.cos(angle);
      let y = canvas.height / 2 - radialDistance * Math.sin(angle);
      ctx.moveTo(x, y);
      ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
      ctx.stroke();
    }

  }

  useEffect(() => {
    window.addEventListener('resize', generateSpots);
    () => window.removeEventListener('resize', generateSpots);
  }, []);

  return (
    <div
      className="overview-icon"
      style={{
        left: `${leftOffset}cqw`,
        top: `${topOffset}cqw`,
        width: `${iconSize + 6}cqw`,
      }}
      ref={iconRef}
      onLoad={() => generateSpots()}
    >
      <div className="overview-icon__canvas">
        <canvas></canvas>
      </div>
      <div
        className="overview-icon__logo"
        style={{
          width: `${iconSize}cqw`,
        }}
        onClick={() => openIcon()}
      >
        <img src={imgSrc} alt={platformName} />
        <div className="overview-icon__val">{kbmFormatter(assetCount)}</div>
      </div>
    </div>
  )
}

export default OverviewIcon