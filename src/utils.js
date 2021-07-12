import { URL } from 'url';
import { last } from 'myrmidon';
import createAxiosError from 'axios/lib/core/createError';


export function resolveUrl(base, relativeUrl) {
    const baseUrl = base ? new URL(base) : undefined;
    const absoluteUrl = new URL(relativeUrl, baseUrl);

    if (absoluteUrl.href === relativeUrl) {
        return new URL(absoluteUrl,  baseUrl);
    }

    const apiPrefix = last(baseUrl.pathname) === '/'
        ? baseUrl.pathname.slice(0, -1)
        : baseUrl.pathname;

    const relPath = apiPrefix
        ? apiPrefix + absoluteUrl.pathname
        : relativeUrl;

    return new URL(relPath,  baseUrl);
}

export function _axiosError(
    opts,
    { message, code },
    data
) {
    return createAxiosError(
        message,
        opts,
        code,
        {},
        { data }
    );
}
