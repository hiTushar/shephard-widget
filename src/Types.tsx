interface ToolbarProps {
    data: Array<Platform>;
    section: string;
    setSection: Function;
}

interface OverviewProps {
    data: Array<Platform>;
    setSection: Function;
}

interface OverviewIconProps {
    leftOffset: number;
    topOffset: number;
    iconSize: number;
    openIcon: Function;
    imgSrc: string;
    platformId: string;
    platformName: string;
    assetCount: number;
}

interface LegendData {
    id: string;
    name: string;
    desc: string;
    color: string;
}

interface ExpandedProps {
    data: Array<Platform>;
    section: string;
}


interface Platform {
    platformId: string;
    platformName: string;
    platformAssets: PlatformAssets;
}

interface PlatformAssets {
    'new_alerts': Array<Asset>;
    'aged_alerts': Array<Asset>;
    'other_assets': Array<Asset>;
    [key: string]: Array<Asset>;
}

interface Asset {
    machine_name?: string;
    machine_uuid?: string;
    group_name?: string;
    group_uuid?: string;
    group_type?: string;
    [key: string]: any;
}

interface AlertCountArray {
    platformId: string;
    assetCount: number;
}

type AssetType = 'new_alerts' | 'aged_alerts' | 'other_assets';

interface SpotObject {
    x: number;
    y: number;
    radius: number;
}

export type { ToolbarProps, ExpandedProps, OverviewProps, OverviewIconProps, LegendData, Platform, PlatformAssets, Asset, AssetType, AlertCountArray, SpotObject };
