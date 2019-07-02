import _ from 'lodash';
import * as moment from 'moment';


export const isNill = (val) => {
    return _.isNil(val);
}

export const isEmpty = (val) => {
    return _.isEmpty(val);
}

export const daysAgo = (date) => {
    return moment(date).fromNow();
}

export const stripValues = (values, pickBy) => {
    values = values.map((value, index) => {
        return _.pick(value, [pickBy])[pickBy];
    });
    values = _.uniqBy(values, 'name');
    return values;
}

export const isObject = (val) => {
    let value = false;
    if (_.isObject) {
        value = true;
    }
    return value;
}

export const omitFromObj = (val, props) => {
    return _.omit(val, props)
}

export const makeObj = (prop, ...props) => {
    return { [`${prop}`]: { ...props } }
}
