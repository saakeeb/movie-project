import _ from "lodash";

export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}

// _item wrap the whole thing into lodash, _value unwrap the whole thing from lodash
// 