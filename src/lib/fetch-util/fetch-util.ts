type HTTPMethod = <T>(url: string, config?: any) => Promise<T>;

const get: HTTPMethod = (url) =>
    fetch(url).then(res => res.json());

const post: HTTPMethod = (url, config) => {
    return fetch(url,
        {
            method: 'POST',
            ...config,
            body: JSON.stringify(config.body)
        }).then(res => res.json());
};

const HttpDelete: HTTPMethod = url =>
    fetch(url, {method: 'delete'}).then(res => res.json());

export const fetchUtil = {
    get,
    post,
    HttpDelete,
};