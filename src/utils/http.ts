const is200 = (statusCode: number) => statusCode === 200;
const is204 = (statusCode: number) => statusCode === 204;
const is400 = (statusCode: number) => statusCode === 400;
const is422 = (statusCode: number) => statusCode === 422;
const is401 = (statusCode: number) => statusCode === 401;
const is404 = (statusCode: number) => statusCode === 404;
const is500 = (statusCode: number) => statusCode === 500;
const is20x = (statusCode: number) => statusCode >= 200 && statusCode <= 299;
export { is200, is204, is20x, is400, is401, is404, is422, is500 };
