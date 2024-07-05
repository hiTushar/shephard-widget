import './Overview.css';

interface Props {
  data: Array<object>;
  section: string;
}

const Overview: React.FC<Props> = ({ data, section }) => {

  const getSpokes: Array<JSX.Element> = (totalDivisions: number) => {
    let spokeArray: Array<JSX.Element> = [];
    for (let idx = 0; idx <= totalDivisions; idx++) {
      spokeArray.push(
        <div
          className="overview-center__spoke"
          key={idx}
          style={{ transform: `rotate(-${180 / totalDivisions * idx}deg) ` }}
        >
        </div>
      )
    }
    return spokeArray;
  }

  const getOrbits: Array<JSX.Element> = (totalDivisions: number) => {
    let orbitArray: Array<JSX.Element> = [];
    let maxRadius = 45;
    let minRadius = 8;
    let radiusIncrement = (maxRadius - minRadius) / totalDivisions;

    let maxOpacity = 1;
    let minOpacity = 0.1;
    let opacityDecrement = (maxOpacity - minOpacity) / totalDivisions;

    for (let idx = 1; idx <= totalDivisions; idx++) {
      orbitArray.push(
        <circle
          cx="50"
          cy="50"
          r={minRadius + radiusIncrement * idx}
          stroke={`rgba(255, 255, 255, ${maxOpacity - opacityDecrement * idx})`}
          stroke-width="0.3"
          stroke-dasharray="0.65 0.75"
          fill="none"
        />
      )
    }
    return (
      <svg viewBox='0 0 100 100'>
        {orbitArray}
      </svg>
    )
  }

  return (
    <div className="overview">
      <div className="overview-center">
        {
          getSpokes(data.length)

        }
      </div>
      <div className="overview-orbit">
        {
          getOrbits(data.length)
        }
      </div>
    </div>
  )
}

export default Overview;
