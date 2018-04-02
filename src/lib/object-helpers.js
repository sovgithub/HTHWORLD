export const keyMapper = (object_to_map, map) =>
  Object.keys(object_to_map).reduce(
    (mappedVersion, key) => ({
      ...mappedVersion,
      [map[key] || key]: object_to_map[key],
    }),
    {}
  );
