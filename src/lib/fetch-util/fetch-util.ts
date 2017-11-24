type HTTPMethod = <T>(url: string) => Promise<T>;

const get: HTTPMethod = url =>
    fetch(url).then(res => res.json());

const post: HTTPMethod = url =>
    fetch(url, {method: 'post'}).then(res => res.json());

const HttpDelete: HTTPMethod = url =>
    fetch(url, {method: 'delete'}).then(res => res.json());

export const fetchUtil = {
    get,
    post,
    HttpDelete,
};