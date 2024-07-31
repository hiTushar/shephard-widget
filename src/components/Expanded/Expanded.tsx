import './Expanded.css';
import { PLATFORMS_ICON_MAP } from '../../assets/assets';
import { useMemo, useState } from 'react';
import { inRadians } from '../../Utils/Utils';
import type { ExpandedProps, LegendData, Platform } from '../../Types';
import { useParams } from 'react-router-dom';

const LEGEND_DATA: Array<LegendData> = [
  {
    id: 'new_alerts',
    name: 'Assets with Alerts',
    desc: '',
    color: 'rgb(208, 6, 6)'
  },
  {
    id: 'aged_alerts',
    name: 'Assets with Aged Alerts',
    desc: '> 14 days',
    color: 'rgb(125, 17, 17)'
  },
  {
    id: 'other_assets',
    name: 'Other Assets',
    desc: '',
    color: 'rgb(15, 68, 92)'
  }
]

const CENTER_CIRCLE_RADIUS_PERCENTAGE = 10;
const LAST_ORBIT_RADIUS_PERCENTAGE = 65;
const PLOT_START_ANGLE = 0;
const PLOT_END_ANGLE = 360;
const DIVISIONS = 8;
const DATA_PT_MARGIN = 0.001; // percentage
const ORBIT_CENTER_OFFSET_LEFT = 50;
const ORBIT_CENTER_OFFSET_TOP = 52;

const Expanded: React.FC = () => {
  const { platformId, alertId, groupId } = useParams();
  console.log(platformId, alertId, groupId);
  return (
    <div>
      expanded
    </div>
  )
}

export default Expanded