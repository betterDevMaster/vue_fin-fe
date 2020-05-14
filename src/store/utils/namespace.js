function mapValues(object, func) {
  const result = {};
  Object.keys(object).forEach(key => {
    result[key] = func(object[key], key);
  });
  return result;
}

export default (module, types) => {
  const object = {};
  mapValues(types, (names, type) => {
    object[type] = {};
    const namespacedType = `namespaced${type
      .charAt(0)
      .toUpperCase()}${type.slice(1)}`;
    object[namespacedType] = {};
    types[type].forEach(name => {
      const newKey = `${module}:${name}`;
      object[type][name] = newKey;
      object[namespacedType][name] = `${module}/${newKey}`;
    });
  });
  return object;
};
