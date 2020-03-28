
interface Point {
  x: number;
  y: number;
};

interface PointFalse {
  x: false,
  y: false
};

interface Offset {
  top: number;
  left: number;
};

export function findPosition(el: HTMLElement): Offset {
  let viewportOffset: ClientRect = el.getBoundingClientRect();
  let top: number = viewportOffset.top + window.scrollY;
  let left: number = viewportOffset.left + window.scrollX;
  return { top, left };
}

export function parseElement(parent: string | HTMLElement | SVGElement): string | HTMLElement | SVGElement {
  let parsedParent = typeof parent === 'string'
    ? document.getElementById(parent.replace('#', ''))
    : parent;

  return parsedParent instanceof HTMLElement || parsedParent instanceof SVGElement
    ? parsedParent
    : 'No valid parent argument';
}

export function locateMouse(e: MouseEvent, offset: Offset): Point {
  return {
    x: e.pageX - offset.left,
    y: e.pageY - offset.top
  };
}

export function locateTouch(e: TouchEvent, offset: Offset): Point | PointFalse {
  if (!e.targetTouches.length) {
    return { x: false, y: false }
  }
  return {
    x: e.targetTouches[0].pageX - offset.left,
    y: e.targetTouches[0].pageY - offset.top
  };
}

export function SmartCanvas(parent: HTMLElement) {
  const element: HTMLCanvasElement = document.createElement('canvas');
  const context: CanvasRenderingContext2D | null = element.getContext('2d');
  parent.appendChild(element);

  const resize = (w: number, h: number) => {
    element.width = w * 2;
    element.height = h * 2;
    element.style.width = w + 'px';
    element.style.height = h + 'px';
  }
}