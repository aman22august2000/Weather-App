export const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const daysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const celciusToFerinheight = c => c * 9/5 + 32

export function normalizeArray( array, minValue, maxValue ) {
  
  const minOfArray = Math.min( ...array.map( value => value === null ? Infinity : value) )
  const shiftedArray = array.map( value => value - minOfArray)
  const maxOfShiftedArray = Math.max(...shiftedArray)
  const normalizedTo1 = shiftedArray.map( value => value / maxOfShiftedArray )

  const range = maxValue - minValue
  const scaledtoRangeMax = normalizedTo1.map( value => value * range )
  const normalized = scaledtoRangeMax.map( value => value + minValue)

  return normalized

}


// ------------------------------------------------------------------------
//                    BEZIER CURVE CODE START
//       from https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
// ------------------------------------------------------------------------


// The smoothing ratio
const smoothing = 0.2


// Properties of a line 
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  }
}

// Position of a control point 
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, reverse, smoothing) => {

  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current
  const n = next || current

  // Properties of the opposed-line
  const o = line(p, n)

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing

  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length
  const y = current[1] + Math.sin(angle) * length
  return [x, y]
}

// Create the bezier curve command 
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
export const bezierCommand = (point, i, a, smoothing) => {

  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point, false, smoothing)

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true, smoothing)
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
}

// Render the svg <path> element 
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element
export const svgPath = (points, command, smoothing) => {
  // build the d attributes by looping over the points
  const d = points.reduce((acc, point, i, a) => i === 0
    ? `M ${point[0]},${point[1]}`
    : `${acc} ${command(point, i, a, smoothing)}`
  , '')
  // return `<path d="${d}" fill="none" stroke="grey" />`
  return d
}

// const svg = document.querySelector('.svg')

// svg.innerHTML = svgPath(points, bezierCommand)


// ------------------------------------------------------------------------
//                    END BEZIER CURVE CODE
// ------------------------------------------------------------------------





export const sampleData = {
   "meta": {
     "source": "National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
   },
   "data": [
     {
       "month": "2009-01",
       "temperature_mean": 15.6,
       "temperature_mean_min": 10.4,
       "temperature_mean_max": 20.8,
       "temperature_min": 5.6,
       "temperature_max": 27.2,
       "precipitation": 2,
       "raindays": 1,
       "pressure": 1020.1,
       "sunshine": null
     },
     {
       "month": "2009-02",
       "temperature_mean": 14.4,
       "temperature_mean_min": 10.2,
       "temperature_mean_max": 18.5,
       "temperature_min": 7.2,
       "temperature_max": 27.8,
       "precipitation": 67,
       "raindays": 7,
       "pressure": 1019,
       "sunshine": null
     },
     {
       "month": "2009-03",
       "temperature_mean": 15.3,
       "temperature_mean_min": 12,
       "temperature_mean_max": 18.6,
       "temperature_min": 9.4,
       "temperature_max": 29.4,
       "precipitation": 5,
       "raindays": 2,
       "pressure": 1017.4,
       "sunshine": null
     },
     {
       "month": "2009-04",
       "temperature_mean": 17,
       "temperature_mean_min": 13.8,
       "temperature_mean_max": 20.2,
       "temperature_min": 11.1,
       "temperature_max": 36.7,
       "precipitation": 4,
       "raindays": 2,
       "pressure": 1016.7,
       "sunshine": null
     },
     {
       "month": "2009-05",
       "temperature_mean": 17.9,
       "temperature_mean_min": 15.7,
       "temperature_mean_max": 20,
       "temperature_min": 13.9,
       "temperature_max": 23.9,
       "precipitation": 1,
       "raindays": 1,
       "pressure": 1014.4,
       "sunshine": null
     },
     {
       "month": "2009-06",
       "temperature_mean": 19,
       "temperature_mean_min": 16.9,
       "temperature_mean_max": 21.1,
       "temperature_min": 15.6,
       "temperature_max": 23.3,
       "precipitation": 0.5,
       "raindays": 0,
       "pressure": 1013.4,
       "sunshine": null
     },
     {
       "month": "2009-07",
       "temperature_mean": 21.5,
       "temperature_mean_min": 18.8,
       "temperature_mean_max": 24.2,
       "temperature_min": 16.1,
       "temperature_max": 27.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.9,
       "sunshine": null
     },
     {
       "month": "2009-08",
       "temperature_mean": 22.4,
       "temperature_mean_min": 19.4,
       "temperature_mean_max": 25.4,
       "temperature_min": 17.8,
       "temperature_max": 32.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.7,
       "sunshine": null
     },
     {
       "month": "2009-09",
       "temperature_mean": 22.3,
       "temperature_mean_min": 19.3,
       "temperature_mean_max": 25.3,
       "temperature_min": 17.2,
       "temperature_max": 30,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.7,
       "sunshine": null
     },
     {
       "month": "2009-10",
       "temperature_mean": 18.7,
       "temperature_mean_min": 15.2,
       "temperature_mean_max": 22.1,
       "temperature_min": 10,
       "temperature_max": 29.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.4,
       "sunshine": null
     },
     {
       "month": "2009-11",
       "temperature_mean": 16.3,
       "temperature_mean_min": 11.7,
       "temperature_mean_max": 20.8,
       "temperature_min": 8.3,
       "temperature_max": 25.6,
       "precipitation": 3,
       "raindays": 1,
       "pressure": 1015.7,
       "sunshine": null
     },
     {
       "month": "2009-12",
       "temperature_mean": 13.7,
       "temperature_mean_min": 9.9,
       "temperature_mean_max": 17.4,
       "temperature_min": 5.6,
       "temperature_max": 25,
       "precipitation": 58,
       "raindays": 4,
       "pressure": 1017.5,
       "sunshine": null
     },
     {
       "month": "2010-01",
       "temperature_mean": 14.6,
       "temperature_mean_min": 10,
       "temperature_mean_max": 19.2,
       "temperature_min": 7.2,
       "temperature_max": 24.4,
       "precipitation": 86,
       "raindays": 7,
       "pressure": 1015.7,
       "sunshine": null
     },
     {
       "month": "2010-02",
       "temperature_mean": 14.6,
       "temperature_mean_min": 10.9,
       "temperature_mean_max": 18.3,
       "temperature_min": 7.2,
       "temperature_max": 25.6,
       "precipitation": 58,
       "raindays": 9,
       "pressure": 1016,
       "sunshine": null
     },
     {
       "month": "2010-03",
       "temperature_mean": 15.7,
       "temperature_mean_min": 11.8,
       "temperature_mean_max": 19.6,
       "temperature_min": 7.8,
       "temperature_max": 27.8,
       "precipitation": 17,
       "raindays": 2,
       "pressure": 1017.4,
       "sunshine": null
     },
     {
       "month": "2010-04",
       "temperature_mean": 15.6,
       "temperature_mean_min": 12.5,
       "temperature_mean_max": 18.7,
       "temperature_min": 8.9,
       "temperature_max": 26.1,
       "precipitation": 45,
       "raindays": 6,
       "pressure": 1015.8,
       "sunshine": null
     },
     {
       "month": "2010-05",
       "temperature_mean": 16.7,
       "temperature_mean_min": 14.2,
       "temperature_mean_max": 19.3,
       "temperature_min": 11.1,
       "temperature_max": 22.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1015.6,
       "sunshine": null
     },
     {
       "month": "2010-06",
       "temperature_mean": 17.7,
       "temperature_mean_min": 15.7,
       "temperature_mean_max": 19.6,
       "temperature_min": 14.4,
       "temperature_max": 21.7,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1014.5,
       "sunshine": null
     },
     {
       "month": "2010-07",
       "temperature_mean": 18.8,
       "temperature_mean_min": 16.8,
       "temperature_mean_max": 20.8,
       "temperature_min": 15,
       "temperature_max": 27.2,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1013.3,
       "sunshine": null
     },
     {
       "month": "2010-08",
       "temperature_mean": 20,
       "temperature_mean_min": 17.3,
       "temperature_mean_max": 22.7,
       "temperature_min": 15.6,
       "temperature_max": 27.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.3,
       "sunshine": null
     },
     {
       "month": "2010-09",
       "temperature_mean": 20.5,
       "temperature_mean_min": 17.4,
       "temperature_mean_max": 23.5,
       "temperature_min": 15.6,
       "temperature_max": 35,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1011.8,
       "sunshine": null
     },
     {
       "month": "2010-10",
       "temperature_mean": 20,
       "temperature_mean_min": 17.4,
       "temperature_mean_max": 22.6,
       "temperature_min": 13.3,
       "temperature_max": 28.3,
       "precipitation": 55,
       "raindays": 7,
       "pressure": 1016.8,
       "sunshine": null
     },
     {
       "month": "2010-11",
       "temperature_mean": 16.8,
       "temperature_mean_min": 12.4,
       "temperature_mean_max": 21.3,
       "temperature_min": 5.6,
       "temperature_max": 37.8,
       "precipitation": 23,
       "raindays": 4,
       "pressure": 1018.6,
       "sunshine": null
     },
     {
       "month": "2010-12",
       "temperature_mean": 14.9,
       "temperature_mean_min": 11.1,
       "temperature_mean_max": 18.7,
       "temperature_min": 6.7,
       "temperature_max": 28.3,
       "precipitation": 127,
       "raindays": 7,
       "pressure": 1017.4,
       "sunshine": null
     },
     {
       "month": "2011-01",
       "temperature_mean": 15.6,
       "temperature_mean_min": 10.7,
       "temperature_mean_max": 20.6,
       "temperature_min": 7.2,
       "temperature_max": 27.8,
       "precipitation": 8,
       "raindays": 2,
       "pressure": 1018.7,
       "sunshine": null
     },
     {
       "month": "2011-02",
       "temperature_mean": 14.2,
       "temperature_mean_min": 10.1,
       "temperature_mean_max": 18.4,
       "temperature_min": 6.7,
       "temperature_max": 25.6,
       "precipitation": 53,
       "raindays": 5,
       "pressure": 1019.6,
       "sunshine": null
     },
     {
       "month": "2011-03",
       "temperature_mean": 16.1,
       "temperature_mean_min": 12.5,
       "temperature_mean_max": 19.6,
       "temperature_min": 8.9,
       "temperature_max": 27.8,
       "precipitation": 37,
       "raindays": 6,
       "pressure": 1018.6,
       "sunshine": null
     },
     {
       "month": "2011-04",
       "temperature_mean": 17.6,
       "temperature_mean_min": 14.5,
       "temperature_mean_max": 20.7,
       "temperature_min": 8.3,
       "temperature_max": 26.7,
       "precipitation": 32,
       "raindays": 4,
       "pressure": 1016.3,
       "sunshine": null
     },
     {
       "month": "2011-05",
       "temperature_mean": 18.2,
       "temperature_mean_min": 15.2,
       "temperature_mean_max": 21.1,
       "temperature_min": 13.3,
       "temperature_max": 31.7,
       "precipitation": 9,
       "raindays": 3,
       "pressure": 1015.7,
       "sunshine": null
     },
     {
       "month": "2011-06",
       "temperature_mean": 18.6,
       "temperature_mean_min": 16.2,
       "temperature_mean_max": 21.1,
       "temperature_min": 13.9,
       "temperature_max": 23.9,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1013.6,
       "sunshine": null
     },
     {
       "month": "2011-07",
       "temperature_mean": 21.1,
       "temperature_mean_min": 18.7,
       "temperature_mean_max": 23.5,
       "temperature_min": 16.7,
       "temperature_max": 28.3,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.5,
       "sunshine": null
     },
     {
       "month": "2011-08",
       "temperature_mean": 20.6,
       "temperature_mean_min": 18.1,
       "temperature_mean_max": 23.1,
       "temperature_min": 16.1,
       "temperature_max": 27.2,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.7,
       "sunshine": null
     },
     {
       "month": "2011-09",
       "temperature_mean": 20.7,
       "temperature_mean_min": 17.7,
       "temperature_mean_max": 22.9,
       "temperature_min": 16.7,
       "temperature_max": 36.1,
       "precipitation": 3,
       "raindays": 2,
       "pressure": 1013.7,
       "sunshine": null
     },
     {
       "month": "2011-10",
       "temperature_mean": 18.7,
       "temperature_mean_min": 15.3,
       "temperature_mean_max": 22.1,
       "temperature_min": 12.2,
       "temperature_max": 31.7,
       "precipitation": 12,
       "raindays": 1,
       "pressure": 1015,
       "sunshine": null
     },
     {
       "month": "2011-11",
       "temperature_mean": 15.7,
       "temperature_mean_min": 11.6,
       "temperature_mean_max": 19.7,
       "temperature_min": 8.9,
       "temperature_max": 27.8,
       "precipitation": 79,
       "raindays": 6,
       "pressure": 1017.6,
       "sunshine": null
     },
     {
       "month": "2011-12",
       "temperature_mean": 13.1,
       "temperature_mean_min": 8.3,
       "temperature_mean_max": 17.9,
       "temperature_min": 5,
       "temperature_max": 23.3,
       "precipitation": 22,
       "raindays": 3,
       "pressure": 1019.6,
       "sunshine": null
     },
     {
       "month": "2012-01",
       "temperature_mean": 14.5,
       "temperature_mean_min": 9.5,
       "temperature_mean_max": 19.6,
       "temperature_min": 6.1,
       "temperature_max": 28.3,
       "precipitation": 10,
       "raindays": 2,
       "pressure": 1019.9,
       "sunshine": null
     },
     {
       "month": "2012-02",
       "temperature_mean": 14.4,
       "temperature_mean_min": 10.5,
       "temperature_mean_max": 18.3,
       "temperature_min": 7.8,
       "temperature_max": 23.9,
       "precipitation": 30,
       "raindays": 5,
       "pressure": 1017.9,
       "sunshine": null
     },
     {
       "month": "2012-03",
       "temperature_mean": 14.5,
       "temperature_mean_min": 11.1,
       "temperature_mean_max": 17.9,
       "temperature_min": 7.2,
       "temperature_max": 27.2,
       "precipitation": 25,
       "raindays": 5,
       "pressure": 1017.8,
       "sunshine": null
     },
     {
       "month": "2012-04",
       "temperature_mean": 16.2,
       "temperature_mean_min": 12.8,
       "temperature_mean_max": 19.5,
       "temperature_min": 9.4,
       "temperature_max": 24.4,
       "precipitation": 22,
       "raindays": 4,
       "pressure": 1016.2,
       "sunshine": null
     },
     {
       "month": "2012-05",
       "temperature_mean": 17.6,
       "temperature_mean_min": 15.4,
       "temperature_mean_max": 19.9,
       "temperature_min": 13.9,
       "temperature_max": 22.2,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1014.2,
       "sunshine": null
     },
     {
       "month": "2012-06",
       "temperature_mean": 18.4,
       "temperature_mean_min": 16.2,
       "temperature_mean_max": 20.6,
       "temperature_min": 15,
       "temperature_max": 24.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.9,
       "sunshine": null
     },
     {
       "month": "2012-07",
       "temperature_mean": 20.4,
       "temperature_mean_min": 18,
       "temperature_mean_max": 22.8,
       "temperature_min": 16.7,
       "temperature_max": 27.2,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.2,
       "sunshine": null
     },
     {
       "month": "2012-08",
       "temperature_mean": 23.2,
       "temperature_mean_min": 20.6,
       "temperature_mean_max": 25.8,
       "temperature_min": 18.3,
       "temperature_max": 30,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.1,
       "sunshine": null
     },
     {
       "month": "2012-09",
       "temperature_mean": 23.8,
       "temperature_mean_min": 20.4,
       "temperature_mean_max": 27.1,
       "temperature_min": 18.3,
       "temperature_max": 38.3,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.7,
       "sunshine": null
     },
     {
       "month": "2012-10",
       "temperature_mean": 20.6,
       "temperature_mean_min": 17,
       "temperature_mean_max": 24.2,
       "temperature_min": 12.2,
       "temperature_max": 33.3,
       "precipitation": 18,
       "raindays": 3,
       "pressure": 1014.6,
       "sunshine": null
     },
     {
       "month": "2012-11",
       "temperature_mean": 16.8,
       "temperature_mean_min": 13.1,
       "temperature_mean_max": 20.5,
       "temperature_min": 8.3,
       "temperature_max": 30.6,
       "precipitation": 7,
       "raindays": 3,
       "pressure": 1018.5,
       "sunshine": null
     },
     {
       "month": "2012-12",
       "temperature_mean": 14.1,
       "temperature_mean_min": 11.1,
       "temperature_mean_max": 17.1,
       "temperature_min": 5,
       "temperature_max": 21.7,
       "precipitation": 56,
       "raindays": 8,
       "pressure": 1018.1,
       "sunshine": null
     },
     {
       "month": "2013-01",
       "temperature_mean": 13.2,
       "temperature_mean_min": 8.4,
       "temperature_mean_max": 18.1,
       "temperature_min": 3.9,
       "temperature_max": 26.7,
       "precipitation": 31,
       "raindays": 4,
       "pressure": 1020.4,
       "sunshine": null
     },
     {
       "month": "2013-02",
       "temperature_mean": 13.5,
       "temperature_mean_min": 9.2,
       "temperature_mean_max": 17.8,
       "temperature_min": 6.7,
       "temperature_max": 25.6,
       "precipitation": 16,
       "raindays": 4,
       "pressure": 1019.2,
       "sunshine": null
     },
     {
       "month": "2013-03",
       "temperature_mean": 15.6,
       "temperature_mean_min": 12.4,
       "temperature_mean_max": 18.8,
       "temperature_min": 8.9,
       "temperature_max": 26.7,
       "precipitation": 31,
       "raindays": 2,
       "pressure": 1017.8,
       "sunshine": null
     },
     {
       "month": "2013-04",
       "temperature_mean": 16.6,
       "temperature_mean_min": 13.8,
       "temperature_mean_max": 19.3,
       "temperature_min": 11.1,
       "temperature_max": 26.1,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1015.9,
       "sunshine": null
     },
     {
       "month": "2013-05",
       "temperature_mean": 18.8,
       "temperature_mean_min": 16.3,
       "temperature_mean_max": 21.3,
       "temperature_min": 14.4,
       "temperature_max": 29.4,
       "precipitation": 7,
       "raindays": 3,
       "pressure": 1014.9,
       "sunshine": null
     },
     {
       "month": "2013-06",
       "temperature_mean": 19.2,
       "temperature_mean_min": 17,
       "temperature_mean_max": 21.5,
       "temperature_min": 13.9,
       "temperature_max": 26.7,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.1,
       "sunshine": null
     },
     {
       "month": "2013-07",
       "temperature_mean": 21.3,
       "temperature_mean_min": 19,
       "temperature_mean_max": 23.6,
       "temperature_min": 17.2,
       "temperature_max": 26.7,
       "precipitation": 1,
       "raindays": 1,
       "pressure": 1013.7,
       "sunshine": null
     },
     {
       "month": "2013-08",
       "temperature_mean": 21.5,
       "temperature_mean_min": 18.7,
       "temperature_mean_max": 24.3,
       "temperature_min": 17.2,
       "temperature_max": 31.7,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.6,
       "sunshine": null
     },
     {
       "month": "2013-09",
       "temperature_mean": 21.9,
       "temperature_mean_min": 18.7,
       "temperature_mean_max": 25.2,
       "temperature_min": 15,
       "temperature_max": 31.1,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1011.1,
       "sunshine": null
     },
     {
       "month": "2013-10",
       "temperature_mean": 18.9,
       "temperature_mean_min": 15.3,
       "temperature_mean_max": 22.5,
       "temperature_min": 12.8,
       "temperature_max": 31.1,
       "precipitation": 6,
       "raindays": 2,
       "pressure": 1014.9,
       "sunshine": null
     },
     {
       "month": "2013-11",
       "temperature_mean": 17.7,
       "temperature_mean_min": 13.7,
       "temperature_mean_max": 21.7,
       "temperature_min": 10.6,
       "temperature_max": 28.9,
       "precipitation": 38,
       "raindays": 2,
       "pressure": 1016.3,
       "sunshine": null
     },
     {
       "month": "2013-12",
       "temperature_mean": 15.2,
       "temperature_mean_min": 10.1,
       "temperature_mean_max": 20.3,
       "temperature_min": 6.7,
       "temperature_max": 27.8,
       "precipitation": 12,
       "raindays": 2,
       "pressure": 1019.1,
       "sunshine": null
     },
     {
       "month": "2014-01",
       "temperature_mean": 16.3,
       "temperature_mean_min": 11.1,
       "temperature_mean_max": 21.4,
       "temperature_min": 7.8,
       "temperature_max": 27.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1018.8,
       "sunshine": null
     },
     {
       "month": "2014-02",
       "temperature_mean": 16.2,
       "temperature_mean_min": 12.4,
       "temperature_mean_max": 20,
       "temperature_min": 8.9,
       "temperature_max": 24.4,
       "precipitation": 26,
       "raindays": 5,
       "pressure": 1017.2,
       "sunshine": null
     },
     {
       "month": "2014-03",
       "temperature_mean": 17.8,
       "temperature_mean_min": 14.6,
       "temperature_mean_max": 21,
       "temperature_min": 11.1,
       "temperature_max": 30.6,
       "precipitation": 33,
       "raindays": 2,
       "pressure": 1017.2,
       "sunshine": null
     },
     {
       "month": "2014-04",
       "temperature_mean": 18.5,
       "temperature_mean_min": 15,
       "temperature_mean_max": 22,
       "temperature_min": 11.1,
       "temperature_max": 34.4,
       "precipitation": 14,
       "raindays": 4,
       "pressure": 1015.6,
       "sunshine": null
     },
     {
       "month": "2014-05",
       "temperature_mean": 20.8,
       "temperature_mean_min": 17.3,
       "temperature_mean_max": 24.3,
       "temperature_min": 13.9,
       "temperature_max": 36.1,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.7,
       "sunshine": null
     },
     {
       "month": "2014-06",
       "temperature_mean": 20.2,
       "temperature_mean_min": 17.9,
       "temperature_mean_max": 22.5,
       "temperature_min": 16.7,
       "temperature_max": 24.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.4,
       "sunshine": null
     },
     {
       "month": "2014-07",
       "temperature_mean": 23.1,
       "temperature_mean_min": 20.6,
       "temperature_mean_max": 25.7,
       "temperature_min": 19.4,
       "temperature_max": 29.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.8,
       "sunshine": null
     },
     {
       "month": "2014-08",
       "temperature_mean": 23.2,
       "temperature_mean_min": 20.6,
       "temperature_mean_max": 25.9,
       "temperature_min": 19.4,
       "temperature_max": 29.4,
       "precipitation": 2,
       "raindays": 1,
       "pressure": 1013.8,
       "sunshine": null
     },
     {
       "month": "2014-09",
       "temperature_mean": 24.2,
       "temperature_mean_min": 21.2,
       "temperature_mean_max": 27.2,
       "temperature_min": 17.8,
       "temperature_max": 33.9,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1010.9,
       "sunshine": null
     },
     {
       "month": "2014-10",
       "temperature_mean": 22.1,
       "temperature_mean_min": 18.3,
       "temperature_mean_max": 25.9,
       "temperature_min": 16.1,
       "temperature_max": 33.9,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.7,
       "sunshine": null
     },
     {
       "month": "2014-11",
       "temperature_mean": 18.7,
       "temperature_mean_min": 13.9,
       "temperature_mean_max": 23.5,
       "temperature_min": 10,
       "temperature_max": 32.8,
       "precipitation": 10,
       "raindays": 2,
       "pressure": 1017.7,
       "sunshine": null
     },
     {
       "month": "2014-12",
       "temperature_mean": 15.9,
       "temperature_mean_min": 12.1,
       "temperature_mean_max": 19.6,
       "temperature_min": 6.1,
       "temperature_max": 25,
       "precipitation": 114,
       "raindays": 7,
       "pressure": 1018.3,
       "sunshine": null
     },
     {
       "month": "2015-01",
       "temperature_mean": 16,
       "temperature_mean_min": 11.2,
       "temperature_mean_max": 20.8,
       "temperature_min": 5,
       "temperature_max": 26.7,
       "precipitation": 11,
       "raindays": 3,
       "pressure": 1019.3,
       "sunshine": null
     },
     {
       "month": "2015-02",
       "temperature_mean": 17.3,
       "temperature_mean_min": 13.2,
       "temperature_mean_max": 21.3,
       "temperature_min": 10.6,
       "temperature_max": 30,
       "precipitation": 7,
       "raindays": 3,
       "pressure": 1017.3,
       "sunshine": null
     },
     {
       "month": "2015-03",
       "temperature_mean": 19.2,
       "temperature_mean_min": 15,
       "temperature_mean_max": 23.4,
       "temperature_min": 10,
       "temperature_max": 32.2,
       "precipitation": 24,
       "raindays": 2,
       "pressure": 1016.9,
       "sunshine": null
     },
     {
       "month": "2015-04",
       "temperature_mean": 18.8,
       "temperature_mean_min": 15.3,
       "temperature_mean_max": 22.2,
       "temperature_min": 13.3,
       "temperature_max": 30,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1015,
       "sunshine": null
     },
     {
       "month": "2015-05",
       "temperature_mean": 17.7,
       "temperature_mean_min": 15.5,
       "temperature_mean_max": 20,
       "temperature_min": 11.7,
       "temperature_max": 26.1,
       "precipitation": 61,
       "raindays": 4,
       "pressure": 1015.1,
       "sunshine": null
     },
     {
       "month": "2015-06",
       "temperature_mean": 20.5,
       "temperature_mean_min": 17.9,
       "temperature_mean_max": 23,
       "temperature_min": 16.1,
       "temperature_max": 27.8,
       "precipitation": 1,
       "raindays": 1,
       "pressure": 1012.8,
       "sunshine": null
     },
     {
       "month": "2015-07",
       "temperature_mean": 22.5,
       "temperature_mean_min": 19.8,
       "temperature_mean_max": 25.1,
       "temperature_min": 17.8,
       "temperature_max": 31.1,
       "precipitation": 44,
       "raindays": 2,
       "pressure": 1014.3,
       "sunshine": null
     },
     {
       "month": "2015-08",
       "temperature_mean": 24,
       "temperature_mean_min": 20.9,
       "temperature_mean_max": 27,
       "temperature_min": 15.6,
       "temperature_max": 32.2,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.2,
       "sunshine": null
     },
     {
       "month": "2015-09",
       "temperature_mean": 25.1,
       "temperature_mean_min": 21.9,
       "temperature_mean_max": 28.3,
       "temperature_min": 19.4,
       "temperature_max": 35.6,
       "precipitation": 32,
       "raindays": 1,
       "pressure": 1011.6,
       "sunshine": null
     },
     {
       "month": "2015-10",
       "temperature_mean": 23.5,
       "temperature_mean_min": 20,
       "temperature_mean_max": 27.1,
       "temperature_min": 16.7,
       "temperature_max": 37.2,
       "precipitation": 11,
       "raindays": 2,
       "pressure": 1012.8,
       "sunshine": null
     },
     {
       "month": "2015-11",
       "temperature_mean": 17.4,
       "temperature_mean_min": 12.6,
       "temperature_mean_max": 22.3,
       "temperature_min": 8.3,
       "temperature_max": 28.9,
       "precipitation": 39,
       "raindays": 5,
       "pressure": 1016.2,
       "sunshine": null
     },
     {
       "month": "2015-12",
       "temperature_mean": 14.5,
       "temperature_mean_min": 9.8,
       "temperature_mean_max": 19.2,
       "temperature_min": 5,
       "temperature_max": 25,
       "precipitation": 23,
       "raindays": 5,
       "pressure": 1018.1,
       "sunshine": null
     },
     {
       "month": "2016-01",
       "temperature_mean": 14.7,
       "temperature_mean_min": 10.9,
       "temperature_mean_max": 18.6,
       "temperature_min": 6.7,
       "temperature_max": 22.2,
       "precipitation": 82,
       "raindays": 7,
       "pressure": 1019.4,
       "sunshine": null
     },
     {
       "month": "2016-02",
       "temperature_mean": 17.7,
       "temperature_mean_min": 11.9,
       "temperature_mean_max": 23.6,
       "temperature_min": 6.7,
       "temperature_max": 31.7,
       "precipitation": 1,
       "raindays": 1,
       "pressure": 1018.5,
       "sunshine": null
     },
     {
       "month": "2016-03",
       "temperature_mean": 17,
       "temperature_mean_min": 13.7,
       "temperature_mean_max": 20.4,
       "temperature_min": 8.9,
       "temperature_max": 24.4,
       "precipitation": 19,
       "raindays": 4,
       "pressure": 1016.9,
       "sunshine": null
     },
     {
       "month": "2016-04",
       "temperature_mean": 18.6,
       "temperature_mean_min": 15,
       "temperature_mean_max": 22.2,
       "temperature_min": 13.3,
       "temperature_max": 30.6,
       "precipitation": 14,
       "raindays": 3,
       "pressure": 1015.9,
       "sunshine": null
     },
     {
       "month": "2016-05",
       "temperature_mean": 18.3,
       "temperature_mean_min": 16.2,
       "temperature_mean_max": 20.5,
       "temperature_min": 14.4,
       "temperature_max": 22.2,
       "precipitation": 11,
       "raindays": 2,
       "pressure": 1015.1,
       "sunshine": null
     },
     {
       "month": "2016-06",
       "temperature_mean": 20.5,
       "temperature_mean_min": 17.9,
       "temperature_mean_max": 23.1,
       "temperature_min": 16.1,
       "temperature_max": 31.1,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.1,
       "sunshine": null
     },
     {
       "month": "2016-07",
       "temperature_mean": 21.6,
       "temperature_mean_min": 18.9,
       "temperature_mean_max": 24.3,
       "temperature_min": 17.2,
       "temperature_max": 29.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.1,
       "sunshine": null
     },
     {
       "month": "2016-08",
       "temperature_mean": 22.7,
       "temperature_mean_min": 19.9,
       "temperature_mean_max": 25.4,
       "temperature_min": 16.7,
       "temperature_max": 28.9,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.2,
       "sunshine": null
     },
     {
       "month": "2016-09",
       "temperature_mean": 22.2,
       "temperature_mean_min": 18.9,
       "temperature_mean_max": 25.6,
       "temperature_min": 16.1,
       "temperature_max": 38.3,
       "precipitation": 8,
       "raindays": 2,
       "pressure": 1014.1,
       "sunshine": null
     },
     {
       "month": "2016-10",
       "temperature_mean": 21.4,
       "temperature_mean_min": 17.6,
       "temperature_mean_max": 25.3,
       "temperature_min": 16.1,
       "temperature_max": 32.8,
       "precipitation": 2,
       "raindays": 1,
       "pressure": 1014.9,
       "sunshine": null
     },
     {
       "month": "2016-11",
       "temperature_mean": 18.8,
       "temperature_mean_min": 13.9,
       "temperature_mean_max": 23.7,
       "temperature_min": 8.3,
       "temperature_max": 35.6,
       "precipitation": 15,
       "raindays": 5,
       "pressure": 1017.1,
       "sunshine": null
     },
     {
       "month": "2016-12",
       "temperature_mean": 15,
       "temperature_mean_min": 10.8,
       "temperature_mean_max": 19.1,
       "temperature_min": 5,
       "temperature_max": 28.3,
       "precipitation": 107,
       "raindays": 7,
       "pressure": 1018.3,
       "sunshine": null
     },
     {
       "month": "2017-01",
       "temperature_mean": 14.4,
       "temperature_mean_min": 10.7,
       "temperature_mean_max": 18,
       "temperature_min": 6.7,
       "temperature_max": 25,
       "precipitation": 77,
       "raindays": 10,
       "pressure": 1019.3,
       "sunshine": null
     },
     {
       "month": "2017-02",
       "temperature_mean": 15.3,
       "temperature_mean_min": 12.2,
       "temperature_mean_max": 18.5,
       "temperature_min": 8.3,
       "temperature_max": 23.3,
       "precipitation": 94,
       "raindays": 5,
       "pressure": 1017.9,
       "sunshine": null
     },
     {
       "month": "2017-03",
       "temperature_mean": 17.1,
       "temperature_mean_min": 13,
       "temperature_mean_max": 21.2,
       "temperature_min": 8.9,
       "temperature_max": 26.7,
       "precipitation": 2,
       "raindays": 1,
       "pressure": 1018.3,
       "sunshine": null
     },
     {
       "month": "2017-04",
       "temperature_mean": 18.5,
       "temperature_mean_min": 14.6,
       "temperature_mean_max": 22.4,
       "temperature_min": 12.2,
       "temperature_max": 27.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1015.6,
       "sunshine": null
     },
     {
       "month": "2017-05",
       "temperature_mean": 18.3,
       "temperature_mean_min": 15.5,
       "temperature_mean_max": 21,
       "temperature_min": 11.7,
       "temperature_max": 29.4,
       "precipitation": 23,
       "raindays": 2,
       "pressure": 1014.2,
       "sunshine": null
     },
     {
       "month": "2017-06",
       "temperature_mean": 19.8,
       "temperature_mean_min": 16.8,
       "temperature_mean_max": 22.9,
       "temperature_min": 14.4,
       "temperature_max": 28.3,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1012.7,
       "sunshine": null
     },
     {
       "month": "2017-07",
       "temperature_mean": 22.8,
       "temperature_mean_min": 20.3,
       "temperature_mean_max": 25.2,
       "temperature_min": 17.8,
       "temperature_max": 27.8,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.3,
       "sunshine": null
     },
     {
       "month": "2017-08",
       "temperature_mean": 22.8,
       "temperature_mean_min": 20.3,
       "temperature_mean_max": 25.4,
       "temperature_min": 18.9,
       "temperature_max": 29.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013,
       "sunshine": null
     },
     {
       "month": "2017-09",
       "temperature_mean": 22.7,
       "temperature_mean_min": 19.5,
       "temperature_mean_max": 25.9,
       "temperature_min": 15.6,
       "temperature_max": 34.4,
       "precipitation": 2,
       "raindays": 1,
       "pressure": 1012.3,
       "sunshine": null
     },
     {
       "month": "2017-10",
       "temperature_mean": 21.7,
       "temperature_mean_min": 17.5,
       "temperature_mean_max": 25.9,
       "temperature_min": 15,
       "temperature_max": 36.7,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.3,
       "sunshine": null
     },
     {
       "month": "2017-11",
       "temperature_mean": 18.4,
       "temperature_mean_min": 14.2,
       "temperature_mean_max": 22.5,
       "temperature_min": 10,
       "temperature_max": 33.3,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1016.9,
       "sunshine": null
     },
     {
       "month": "2017-12",
       "temperature_mean": 15.7,
       "temperature_mean_min": 9.8,
       "temperature_mean_max": 21.6,
       "temperature_min": 5,
       "temperature_max": 26.7,
       "precipitation": 2,
       "raindays": 1,
       "pressure": 1019.1,
       "sunshine": null
     },
     {
       "month": "2018-01",
       "temperature_mean": 16.4,
       "temperature_mean_min": 11.7,
       "temperature_mean_max": 21,
       "temperature_min": 8.3,
       "temperature_max": 28.3,
       "precipitation": 45,
       "raindays": 2,
       "pressure": 1019.3,
       "sunshine": null
     },
     {
       "month": "2018-02",
       "temperature_mean": 15.2,
       "temperature_mean_min": 10.8,
       "temperature_mean_max": 19.6,
       "temperature_min": 6.7,
       "temperature_max": 27.2,
       "precipitation": 9,
       "raindays": 2,
       "pressure": 1018.3,
       "sunshine": null
     },
     {
       "month": "2018-03",
       "temperature_mean": 16,
       "temperature_mean_min": 12.4,
       "temperature_mean_max": 19.6,
       "temperature_min": 8.3,
       "temperature_max": 23.3,
       "precipitation": 24,
       "raindays": 4,
       "pressure": 1018.3,
       "sunshine": null
     },
     {
       "month": "2018-04",
       "temperature_mean": 17.5,
       "temperature_mean_min": 14,
       "temperature_mean_max": 21,
       "temperature_min": 11.7,
       "temperature_max": 29.4,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1016.8,
       "sunshine": null
     },
     {
       "month": "2018-05",
       "temperature_mean": 17.5,
       "temperature_mean_min": 15.2,
       "temperature_mean_max": 19.9,
       "temperature_min": 12.2,
       "temperature_max": 26.7,
       "precipitation": 3,
       "raindays": 1,
       "pressure": 1015.5,
       "sunshine": null
     },
     {
       "month": "2018-06",
       "temperature_mean": 19.7,
       "temperature_mean_min": 17.4,
       "temperature_mean_max": 22,
       "temperature_min": 15.6,
       "temperature_max": 25.6,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.2,
       "sunshine": null
     },
     {
       "month": "2018-07",
       "temperature_mean": 24,
       "temperature_mean_min": 21,
       "temperature_mean_max": 27,
       "temperature_min": 17.2,
       "temperature_max": 35.6,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.5,
       "sunshine": null
     },
     {
       "month": "2018-08",
       "temperature_mean": 25.6,
       "temperature_mean_min": 22.8,
       "temperature_mean_max": 28.5,
       "temperature_min": 21.1,
       "temperature_max": 32.8,
       "precipitation": 1,
       "raindays": 0,
       "pressure": 1013.8,
       "sunshine": null
     },
     {
       "month": "2018-09",
       "temperature_mean": 22.2,
       "temperature_mean_min": 19.5,
       "temperature_mean_max": 24.8,
       "temperature_min": 17.2,
       "temperature_max": 29.4,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1012.3,
       "sunshine": null
     },
     {
       "month": "2018-10",
       "temperature_mean": 20.7,
       "temperature_mean_min": 17.2,
       "temperature_mean_max": 24.1,
       "temperature_min": 13.9,
       "temperature_max": 30.6,
       "precipitation": 15,
       "raindays": 2,
       "pressure": 1013.5,
       "sunshine": null
     },
     {
       "month": "2018-11",
       "temperature_mean": 18.7,
       "temperature_mean_min": 14,
       "temperature_mean_max": 23.3,
       "temperature_min": 10,
       "temperature_max": 31.1,
       "precipitation": 21,
       "raindays": 2,
       "pressure": 1017.1,
       "sunshine": null
     },
     {
       "month": "2018-12",
       "temperature_mean": 15.5,
       "temperature_mean_min": 11.2,
       "temperature_mean_max": 19.5,
       "temperature_min": 5,
       "temperature_max": 25.6,
       "precipitation": 77,
       "raindays": 4,
       "pressure": 1018.5,
       "sunshine": null
     },
     {
       "month": "2019-01",
       "temperature_mean": 14.8,
       "temperature_mean_min": 10.6,
       "temperature_mean_max": 19.1,
       "temperature_min": 5,
       "temperature_max": 25.6,
       "precipitation": 71,
       "raindays": 9,
       "pressure": 1019.5,
       "sunshine": null
     },
     {
       "month": "2019-02",
       "temperature_mean": 13.2,
       "temperature_mean_min": 9.4,
       "temperature_mean_max": 17,
       "temperature_min": 5,
       "temperature_max": 21.7,
       "precipitation": 87,
       "raindays": 11,
       "pressure": 1017.8,
       "sunshine": null
     },
     {
       "month": "2019-03",
       "temperature_mean": 15.8,
       "temperature_mean_min": 12.4,
       "temperature_mean_max": 19.3,
       "temperature_min": 10,
       "temperature_max": 27.8,
       "precipitation": 31,
       "raindays": 5,
       "pressure": 1018,
       "sunshine": null
     },
     {
       "month": "2019-04",
       "temperature_mean": 17.9,
       "temperature_mean_min": 14.9,
       "temperature_mean_max": 21,
       "temperature_min": 12.8,
       "temperature_max": 27.2,
       "precipitation": 4,
       "raindays": 2,
       "pressure": 1016.1,
       "sunshine": null
     },
     {
       "month": "2019-05",
       "temperature_mean": 17.7,
       "temperature_mean_min": 15.2,
       "temperature_mean_max": 20.1,
       "temperature_min": 12.8,
       "temperature_max": 22.2,
       "precipitation": 20,
       "raindays": 7,
       "pressure": 1014.4,
       "sunshine": null
     },
     {
       "month": "2019-06",
       "temperature_mean": 19.1,
       "temperature_mean_min": null,
       "temperature_mean_max": 21.2,
       "temperature_min": 16.1,
       "temperature_max": 26.1,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.6,
       "sunshine": null
     },
     {
       "month": "2019-07",
       "temperature_mean": 21.1,
       "temperature_mean_min": null,
       "temperature_mean_max": 23.7,
       "temperature_min": 16.7,
       "temperature_max": 28.9,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1014.5,
       "sunshine": null
     },
     {
       "month": "2019-08",
       "temperature_mean": null,
       "temperature_mean_min": null,
       "temperature_mean_max": 24.7,
       "temperature_min": 17.8,
       "temperature_max": 28.9,
       "precipitation": 0,
       "raindays": 0,
       "pressure": 1013.5,
       "sunshine": null
     },
     {
       "month": "2019-09",
       "temperature_mean": null,
       "temperature_mean_min": null,
       "temperature_mean_max": 25.7,
       "temperature_min": 13.9,
       "temperature_max": 30,
       "precipitation": 3,
       "raindays": 1,
       "pressure": 1012.8,
       "sunshine": null
     },
     {
       "month": "2019-10",
       "temperature_mean": null,
       "temperature_mean_min": null,
       "temperature_mean_max": null,
       "temperature_min": null,
       "temperature_max": null,
       "precipitation": null,
       "raindays": null,
       "pressure": null,
       "sunshine": null
     },
     {
       "month": "2019-11",
       "temperature_mean": null,
       "temperature_mean_min": null,
       "temperature_mean_max": null,
       "temperature_min": null,
       "temperature_max": null,
       "precipitation": null,
       "raindays": null,
       "pressure": null,
       "sunshine": null
     },
     {
       "month": "2019-12",
       "temperature_mean": null,
       "temperature_mean_min": null,
       "temperature_mean_max": null,
       "temperature_min": null,
       "temperature_max": null,
       "precipitation": null,
       "raindays": null,
       "pressure": null,
       "sunshine": null
     }
   ]
 }