interface OverviewProps {
    data: Array<Platform>;
    setSection: Function;
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

export type { ExpandedProps, OverviewProps, LegendData, Platform, PlatformAssets, Asset, AssetType, AlertCountArray };
