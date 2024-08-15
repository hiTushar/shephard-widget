const ENDPOINTS = {
    OVERVIEW: () => '/assets',
    GROUPED: (platformId: string, alertType: string, page: number, limit: number) => `/assets/${platformId}/${alertType}?page=${page}&limit=${limit}`,
    EXPANDED: (platformId: string, alertType: string, groupId: string, page: number, limit: number) => `/assets/${platformId}/${alertType}/${groupId}?page=${page}&limit=${limit}`
}

export default ENDPOINTS;
