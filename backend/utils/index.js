import _ from "lodash";

export const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

export const removeUnderfinedObjectKey = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) delete obj[key];
  });

  return obj;
};
