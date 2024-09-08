import overviewData from './dataBank/overviewData.json';
import newAlertGrpData from './dataBank/newAlertGrpData.json';
import agedAlertGrpData from './dataBank/agedAlertGrpData.json';
import noAlertGrpData from './dataBank/noAlertGrpData.json';
import assetLevelData from './dataBank/assetLevelData.json';

import ApiMethods from "./ApiMethods";
import ENDPOINTS from "./EndPoints";
import { alertGroupInterface, assetGroupInterface, Platform } from '../Types';

const BASE_URL = 'xyz/';
const DEMO = true;

class ApiManager {
    static getOverviewData(): Promise<{data: Array<Platform>}> {
        let url = `${BASE_URL}${ENDPOINTS.OVERVIEW()}`;
        if (DEMO) {
            return new Promise((resolve) => {
                console.log('Fetching overview data...');
                setTimeout(() => {
                    console.log('Data fetched!');
                    resolve(overviewData);
                }, 1500)
            })
        }
        
        return ApiMethods.get<{data: Array<Platform>}>(url);
    }

    static getGroupedData(platformId: string, alertType: string, page: number, limit: number): Promise<alertGroupInterface> {
        let url = `${BASE_URL}${ENDPOINTS.GROUPED(platformId, alertType, page, limit)}`;
        if (DEMO) {
            return new Promise((resolve) => {
                console.log(`Fetching ${alertType} grouped data...`);
                setTimeout(() => {
                    console.log('Data fetched!');
                    if(alertType === 'new_alerts') {
                        // resolve({data: [], meta: {}})
                        resolve(newAlertGrpData);
                    } else if(alertType === 'aged_alerts') {
                        resolve(agedAlertGrpData);
                    } else {
                        resolve(noAlertGrpData);
                    }
                }, 1500)
            })
        }
        
        return ApiMethods.get<alertGroupInterface>(url);
    }

    static getExpandedData(platformId: string, alertType: string, groupId: string, page: number, limit: number): Promise<assetGroupInterface> {
        let url = `${BASE_URL}${ENDPOINTS.EXPANDED(platformId, alertType, groupId, page, limit)}`;
        if (DEMO) {
            return new Promise((resolve) => {
                console.log(`Fetching ${alertType} expanded data...`);
                setTimeout(() => {
                    console.log('Data fetched!');
                    resolve(assetLevelData);
                }, 1500)
            })
        }
        
        return ApiMethods.get<assetGroupInterface>(url);
    }
}

export default ApiManager;
