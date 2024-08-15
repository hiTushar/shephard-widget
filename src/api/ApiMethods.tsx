const getAuthToken = () => { return '' }

class ApiMethods {
    static apiRequest<T>(url: string, method: string) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthToken()
            }
        }) as Promise<T>;
    }

    static get<T>(url: string) {
        return this.apiRequest<T>(url, 'GET');
    }
}

export default ApiMethods;
