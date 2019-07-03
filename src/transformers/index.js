// @flow
import _ from 'lodash';
import * as moment from 'moment';

export const isNill = (val: any): boolean => {
  return _.isNil(val);
};

export const isEmpty = (val: Array<mixed>): boolean => {
  return _.isEmpty(val);
};

export const daysAgo = (date: string): string => {
  return moment(date).fromNow();
};

export const stripValues = (values: any, pickBy: string): any => {
  values = values.map((value, index) => {
    return _.pick(value, [pickBy])[pickBy];
  });
  values = _.uniqBy(values, 'name');
  return values;
};

export const isObject = (val: any): boolean => {
  let value = false;
  if (_.isObject(val)) {
    value = true;
  }
  return value;
};

export const omitFromObj = (val: any, props: any): any => {
  return _.omit(val, props);
};

export const makeObj = (prop: string, ...props: any): any => {
  return { [`${prop}`]: { ...props } };
};
