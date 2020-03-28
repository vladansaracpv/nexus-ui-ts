
const isArray = (obj: any): boolean => Array.isArray(obj);
const isNull = (obj: any): boolean => obj == null;
const isSVGEl = (obj: any): boolean => obj instanceof SVGElement;
const isHTMLEl = (obj: any): boolean => obj instanceof HTMLElement;

export const isObject = (obj: any): boolean => {
  return typeof obj === 'object' && !isArray(obj) && !isNull(obj) && !isSVGEl(obj) && !isHTMLEl(obj)
    ? true
    : false;
};
