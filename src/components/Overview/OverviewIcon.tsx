import { useEffect, useMemo, useRef } from "react";
import { OverviewIconProps, SpotObject } from "../../Types"
import { jumbleArray, kbmFormatter } from "../../Utils/Utils";
import './OverviewIcon.css';

const OverviewIcon: React.FC<OverviewIconProps> = (props) => {
  const { leftOffset, topOffset, iconSize, openIcon, imgSrc, platformName, assetCount } = props;
  const spotsRef = useRef<Array<SpotObject>>([]);
  const iconRef = useRef<HTMLDivElement>(null);
  const angleRange = useMemo(() => jumbleArray(Array.from({ length: 36 }, (_, i) => i * 10).filter(angle => angle > 315 || angle < 225)), []); // provide only finite angles to choose from. This reduces search effort for non-overlapping position

  const generateSpots = () => {
    const canvas: HTMLCanvasElement = iconRef.current!.querySelector('.overview-icon__canvas canvas')!;
    canvas.width = iconRef.current!.querySelector<HTMLElement>('.overview-icon__canvas')!.offsetWidth;
    canvas.height = iconRef.current!.querySelector<HTMLElement>('.overview-icon__canvas')!.offsetHeight;

    const iconSize = iconRef.current!.querySelector<HTMLElement>('.overview-icon__logo')!.offsetWidth;


    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    spotsRef.current = [];
    for (let i = 0; i < 10; i++) {
      let circleRadius = Math.random() * (canvas.width / 15 - canvas.width / 20) + canvas.width / 20; 
      let maxDistance = canvas.width / 2 - circleRadius;
      let minDistance = iconSize / 2 + circleRadius + 5;
      let x = 0, y = 0, theta = 0;
      let radialDistance = Math.random() * (maxDistance - minDistance) + minDistance;
      do {
        theta = angleRange[Math.floor(Math.random() * angleRange.length)] * Math.PI / 180;
        x = canvas.width / 2 - radialDistance * Math.cos(theta);
        y = canvas.height / 2 - radialDistance * Math.sin(theta);
      } while (overlapExists(x, y, circleRadius));

      spotsRef.current.push({ x, y, radius: circleRadius });
      drawCircle(ctx, x, y, circleRadius);
    }
    console.log(spotsRef.current);
  }

  const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  const overlapExists = (currentX: number, currentY: number, currentRadius: number): boolean => {
    let overlap = false;
    for (let spot of spotsRef.current) {
      if (Math.sqrt(Math.pow(currentX - spot.x, 2) + Math.pow(currentY - spot.y, 2)) < currentRadius + spot.radius) {
        overlap = true;
        break;
      }
    }
    return overlap;
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
        width: `${iconSize + 8}cqw`,
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