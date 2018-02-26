export function underlinesToSpaces(s) {
  return s.split('_').join(' ').replace('  ', ' ');
}

export function snakeToCamel(s){
  return s.replace(/_\w/g, (m) => m[1].toUpperCase() );
}

export function camelToTitle(s){
  return s
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}
