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
    assetDistribution: { [key: string]: number };
}

interface LegendData {
    id: string;
    name: string;
    desc: string;
}

interface GroupedProps {
    section: string;
}

interface GroupPtsInterface {
    'new_alerts': Array<JSX.Element>;
    'aged_alerts': Array<JSX.Element>;
    'no_alerts': Array<JSX.Element>;
    [key: string]: Array<JSX.Element>;
}

interface GroupedInterface {
    'new_alerts': alertGroupInterface;
    'aged_alerts': alertGroupInterface;
    'no_alerts': alertGroupInterface;
    [key: string]: alertGroupInterface;
};

interface alertGroupInterface {
    data: Array<GroupAsset>;
    meta: metaInterface;
}

interface metaInterface {
    "currentPage"?: number;
    "itemsPerPage"?: number;
    "totalItems"?: number;
    "totalPages"?: number;
    [key: string]: any;
}
interface GroupAsset {
    group_name?: string;
    group_uuid?: string;
    group_type?: string;
    asset_count?: string;
}
interface ExpandedProps {
    data: Array<Platform>;
    section: string;
}

interface AlertTypeData {
    id: string;
    name: string;
    desc: string;
    dataPtStyle: {
        backgroundColor: string;
        filter?: string;
    };
    spokeStyle: {
        background: string;
    };
    originStyle: {
        background: string;
    };
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

interface AssetSpotUIInterface {
    [key: string]: {
        color: string;
        sizeFactor: number;
    }
}

interface ViewReducerInterface {
    type: string;
    platformId: string;
    alertId: string;
    groupId: string;
}

export type {
    ToolbarProps,
    OverviewProps, 
    GroupedProps, 
    GroupPtsInterface, 
    GroupedInterface,
    alertGroupInterface,
    GroupAsset, 
    metaInterface, 
    ExpandedProps,
    AlertTypeData,
    OverviewIconProps, 
    LegendData, 
    Platform, 
    PlatformAssets, 
    Asset, 
    AssetType, 
    AlertCountArray, 
    SpotObject, 
    AssetSpotUIInterface,
    ViewReducerInterface
};
