const getAuthToken = () => {
  return "";
};

class ApiMethods {
  static async apiRequest<T>(url: string, method: string) {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
      },
    });

    return res.json() as Promise<T>;
  }

  static get<T>(url: string) {
    return this.apiRequest<T>(url, "GET");
  }
}

export default ApiMethods;
