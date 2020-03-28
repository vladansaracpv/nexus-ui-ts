// 'use strict';

/**
 * Limit a number to within a minimum and maximum
 * @param  {number} value Input value
 * @param  {number} min   Lower limit
 * @param  {number} max   Upper limit
 * @return {number}       The input value constrained within the lower and upper limits
 * @example
 * Nexus.clip(11,0,10)   // returns 10
 * Nexus.clip(-1,0,10)   // returns 0
 * Nexus.clip(5,0,10)    // returns 5
 */
export function clip(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function normalize(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

/**
 * Scale a value from one range to another range.
 * @param  {number} inNum  Input value
 * @param  {number} inMin  Input range minimum
 * @param  {number} inMax  Input range maximum
 * @param  {number} outMin Output range minimum
 * @param  {number} outMax Output range maximum
 * @return {number}        The input value scaled to its new range
 * @example
 * Nexus.scale(0.5,0,1,0,10)   // returns 5
 * Nexus.scale(0.9,0,1,1,0)    // returns 0.1
 */
export function scale(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return inMin === inMax
    ? outMin
    : (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;
}

interface PolarCoord {
  radius: number;
  angle: number;
};

export function toPolar(x: number, y: number): PolarCoord {
  const r = Math.sqrt(x * x + y * y);
  let theta = Math.atan2(y, x);

  if (theta < 0) {
    theta = theta + (2 * Math.PI);
  }
  return { radius: r, angle: theta };
}

interface CartesianCoord {
  x: number;
  y: number;
}

export function toCartesian(radius: number, angle: number): CartesianCoord {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: radius * cos, y: radius * sin * -1 };
}

export function prune(data: number, scale: number): number {
  return parseFloat(data.toFixed(scale));
}

export function invert(inNum: number): number {
  return scale(inNum, 1, 0, 0, 1);
}

/**
 * Convert a MIDi note number to a frequency value in equal temperament.
 * @param  {number} midi MIDI note value
 * @return {number}      Frequence value
 * @example
 * Nexus.mtof(60)  // returns the frequency number of Middle C
 */
export function mtof(midi: number): number {
  return Math.pow(2, ((midi - 69) / 12)) * 440;
}

/**
 * Interpolate between two numbers
 * @param  {number} loc Interpolation index (0-1)
 * @param  {number} min Lower value
 * @param  {number} max Upper value
 * @return {number}     Interpolated value
 * @example
 * Nexus.interp(0.5,2,4)   // returns 3
 * Nexus.interp(0.1,0,10)     // returns 1
 */
export function interp(loc: number, min: number, max: number): number {
  return loc * (max - min) + min;
}

/**
 * Return a random choice from a list of arguments
 * @return {various} One random argument
 * @example
 * Nexus.pick(1,2,3,4)   // returns 1, 2, 3, or 4
 * Nexus.pick(function1,function2)   // returns either function1 or function2
 */
export function pick() {
  return arguments[~~(Math.random() * arguments.length)];
}

/**
 * Returns an octave multiplier for frequency values
 * @param  {number} num Relative octave number (e.g. -1 for one octave down, 1 for one octave up)
 * @return {number}     Octave multiplier
 * @example
 * Nexus.octave(-1)  // returns 0.5
 * Nexus.octave(0)   // returns 1
 * Nexus.octave(1)   // returns 2
 * Nexus.octave(2)   // returns 4
 */
export function octave(num: number): number {
  return Math.pow(2, num);
}

/**
 * Random integer generator. If no second argument is given, will return random integer from 0 to bound1.
 * @param  {number} bound1 Minimum random value
 * @param  {number} bound2 Maximum random value
 * @return {number}        Random integer between lower and upper boundary
 * @example
 * Nexus.ri(10)    // returns random int from 0 to 10
 * Nexus.ri(20,2000) // returns random int from 20 to 2000
 */
export function ri(bound1: number, bound2: number): number {
  if (!bound2) {
    bound2 = bound1;
    bound1 = 0;
  }
  var low = Math.min(bound1, bound2);
  var high = Math.max(bound1, bound2);
  return Math.floor(Math.random() * (high - low) + low);
};

/**
 * Random float number generator. If no second argument is given, will return random float from 0 to bound1.
 * @param  {number} bound1 Minimum random value
 * @param  {number} bound2 Maximum random value
 * @return {number}        Random float between lower and upper boundary
 * @example
 * Nexus.rf(1)    // returns random float from 0 to 1
 * Nexus.rf(1,2) // returns random float from 1 to 2
 */
export function rf(bound1: number, bound2: number) {
  if (!bound2) {
    bound2 = bound1;
    bound1 = 0;
  }
  var low = Math.min(bound1, bound2);
  var high = Math.max(bound1, bound2);
  return Math.random() * (high - low) + low;
};

export function cycle(input: number, min: number, max: number): number {
  input++;
  if (input >= max) {
    input = min;
  }
  return input;
}


/**
 * Average an array of numbers
 * @param  {Array} data Array of numbers to average
 * @return {number}      Average of the input data
 * @example
 * Nexus.average([0,2,4,6,8,10])   // returns 5
 */
export function average(data: number[]): number {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

/**
 * Get the distance from one (x,y) point to another (x,y) point
 * @param  {number} x1 x of first point
 * @param  {number} y1 y of first point
 * @param  {number} x2 x of second point
 * @param  {number} y2 y of second poiny
 * @return {number}    Distance
 * @example
 * Nexus.distance(0,0,3,4)   // returns 5
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

export function gainToDB(gain: number): number {
  return 20 * Math.log10(gain);
}

/**
 * Flip a coin, returning either 0 or 1 according to a probability
 * @param  {number} [odds=0.5] Likelihood of returning 1
 * @return {number}            1 or 0
 * @example
 * Nexus.coin(0.1)   // returns 1 (10% of the time) or 0 (90% of the time)
 */
export function coin(odds = 0.5): number {
  return rf(0, 1) < odds ? 1 : 0;
};
