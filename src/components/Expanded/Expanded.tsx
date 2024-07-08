import './Expanded.css';

interface Props {
  data: Array<object>
}

const LEGEND_DATA:  Array<object> = [
  {
    name: 'Assets with Alerts',
    desc: '',
    color: 'rgb(208, 6, 6)'
  },
  {
    name: 'Assets with Aged Alerts',
    desc: '> 14 days',
    color: 'rgb(125, 17, 17)'
  },
  {
    name: 'Other Assets',
    desc: '',
    color: 'rgb(15, 68, 92)'
  }
]

const Expanded:React.FC<Props> = ({ data }) => {
  
  const getLegend: Array<JSX.Element> = (data: Array<object>) => {
    return data.map((asset, idx) => {
      return (
        <div
          className="expanded-legend__item"
          key={idx}
        >
          <div 
            className="expanded-item__color" 
            style={{ backgroundColor: asset.color }}
          ></div>
          <div className="expanded-item__label">
            <div className="expanded-label__name">{asset.name}</div>
            {
              asset.desc && <div className="expanded-label__desc">{asset.desc}</div>
            }
          </div>
        </div>
      )
    })
  }
  
  return (
    <div className="expanded">
        <div className="expanded-orbit">
          
        </div>
        <div className="expanded-system">

        </div>
        <div className="expanded-legend">
          {
            getLegend(LEGEND_DATA)
          }
        </div>
    </div>
  )
}

export default Expanded