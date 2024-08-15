import overviewData from './dataBank/overviewData.json';
import newAlertGrpData from './dataBank/newAlertGrpData.json';
import agedAlertGrpData from './dataBank/agedAlertGrpData.json';
import noAlertGrpData from './dataBank/noAlertGrpData.json';

import ApiMethods from "./ApiMethods";
import ENDPOINTS from "./EndPoints";
import { alertGroupInterface, Platform } from '../Types';

const BASE_URL = 'xyz/';
const DEMO = true;

class ApiManager {
    static getOverviewData(): Promise<Array<Platform>> {
        let url = `${BASE_URL}${ENDPOINTS.OVERVIEW()}`;
        if (DEMO) {
            return new Promise((resolve) => {
                console.log('Fetching overview data...');
                setTimeout(() => {
                    console.log('Data fetched!');
                    resolve(overviewData);
                }, 3000)
            })
        }
        
        return ApiMethods.get<Array<Platform>>(url);
    }

    static getGroupedData(platformId: string, alertType: string, page: number, limit: number): Promise<alertGroupInterface> {
        let url = `${BASE_URL}${ENDPOINTS.GROUPED(platformId, alertType, page, limit)}`;
        console.log(url);
        if (DEMO) {
            return new Promise((resolve) => {
                console.log(`Fetching ${alertType} grouped data...`);
                setTimeout(() => {
                    console.log('Data fetched!');
                    if(alertType === 'new_alerts') {
                        resolve(newAlertGrpData);
                    } else if(alertType === 'aged_alerts') {
                        resolve(agedAlertGrpData);
                    } else {
                        resolve(noAlertGrpData);
                    }
                }, 3000)
            })
        }
        
        return ApiMethods.get<alertGroupInterface>(url);
    }

    static getExpandedData(platformId: string, alertType: string, groupId: string, page: number, limit: number) {
        let url = `${BASE_URL}${ENDPOINTS.EXPANDED(platformId, alertType, groupId, page, limit)}`;
        if (DEMO) {
            return new Promise((resolve) => {
                console.log(`Fetching ${alertType} expanded data...`);
                setTimeout(() => {
                    console.log('Data fetched!');
                    resolve(overviewData);
                }, 1000)
            })
        }
        
        return ApiMethods.get(url);
    }
}

export default ApiManager;
