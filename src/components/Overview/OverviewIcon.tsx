import { useCallback, useEffect, useMemo, useRef } from "react";
import { AssetSpotUIInterface, OverviewIconProps, SpotObject } from "../../Types"
import { debounce, jumbleArray, kbmFormatter } from "../../Utils/Utils";
import './OverviewIcon.css';

const ASSET_SPOT_UI: AssetSpotUIInterface = { 
  new_alerts: {
    color: 'rgb(208, 6, 6)',
    sizeFactor: 15
  },
  aged_alerts: {
    color: 'rgb(125, 17, 17)',
    sizeFactor: 18
  },
  other_assets: {
    color: 'rgb(15, 68, 92)',
    sizeFactor: 20
  }
}

const OverviewIcon: React.FC<OverviewIconProps> = (props) => {
  const { leftOffset, topOffset, iconSize, openIcon, imgSrc, platformName, assetCount } = props;
  const spotsRef = useRef<Array<SpotObject>>([]);
  const iconRef = useRef<HTMLDivElement>(null);
  const angleRange = useMemo(() => jumbleArray(Array.from({ length: 18 }, (_, i) => i * 20).filter(angle => angle > 300 || angle < 240)), []); // provide only finite angles to choose from. This reduces search effort for non-overlapping position

  useEffect(() => {
    window.addEventListener('resize', debouncedGenerateSpots);
    () => window.removeEventListener('resize', debouncedGenerateSpots);
  }, []);

  const generateSpots = () => {
    const canvas: HTMLCanvasElement = iconRef.current!.querySelector('.overview-icon__canvas canvas')!;
    canvas.width = iconRef.current!.querySelector<HTMLElement>('.overview-icon__canvas')!.offsetWidth;
    canvas.height = iconRef.current!.querySelector<HTMLElement>('.overview-icon__canvas')!.offsetHeight;

    const iconSize = iconRef.current!.querySelector<HTMLElement>('.overview-icon__logo')!.offsetWidth;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spotsRef.current = [];
    // let spotsRemaining = 10;
    // let visibleAssetDistribution = Object.keys(assetDistribution).reduce((acc: {[key: string]: number}, assetType: string) => {
    //   if(assetDistribution[assetType] > 0) {
    //     acc[assetType] = assetDistribution[assetType];
    //   }
    //   return acc;
    // }, {});
    // console.log(platformName);
    let temp = ["new_alerts", "new_alerts", "new_alerts", "aged_alerts", "aged_alerts", "aged_alerts", "other_assets", "other_assets", "other_assets", "other_assets"]; // till I figure out how to generate this on the fly... 3:3:4 when all three, 5:5 when only 2 and 10 when only 1
    for (let i = 0; i < 9; i++) {
      let fillStyle = ASSET_SPOT_UI[temp[i]]!.color;
      let circleRadius = canvas.width / ASSET_SPOT_UI[temp[i]]!.sizeFactor;
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
      drawCircle(ctx, x, y, circleRadius, fillStyle);
    }
  }

  // const throttledGenerateSpots = useCallback(throttle(generateSpots, 5000), []);
  const debouncedGenerateSpots = useCallback(debounce(generateSpots, 1000), []); // to re-calculate spots when window resizing settles

  const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fillStyle: string) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = fillStyle; 
    ctx.fill();
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