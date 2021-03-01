import _ from 'lodash';

export function genPages(items: any, pageSize: number) {
  return _.range(1, Math.ceil(items.length / pageSize) + 1);
}

export function paginateItems(items: any, currentPage: number, pageSize: number) {
  return _(items)
    .slice((currentPage - 1) * pageSize)
    .take(pageSize)
    .value();
}
