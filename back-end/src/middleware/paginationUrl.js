'use strict'
function generatePaginationUrls(req, offset, limit, totalCount) {
    
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    const nextOffset = offset + limit;
    const previousOffset = Math.max(0, offset - limit);
    const nextUrl = nextOffset < totalCount ? `${baseUrl}?limit=${limit}&offset=${nextOffset}` : null;
    const previousUrl = offset > 0 ? `${baseUrl}?limit=${limit}&offset=${previousOffset}` : null;

    return { nextUrl, previousUrl };
}

module.exports = generatePaginationUrls;
