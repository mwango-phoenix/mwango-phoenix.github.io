// Barrel file for project card imagery (thumbnails + PRD slideshow images).
// Keeps sections/Software.tsx focused on content instead of asset wiring.

import fitkit1 from '../fitkit/1.png'
import fitkit2 from '../fitkit/2.png'
import fitkit3 from '../fitkit/3.png'
import fitkit4 from '../fitkit/4.png'
import fitkitThumbnail from '../fitkit/fitkitThumbnail.png'

import luminate1 from '../luminate/1.png'
import luminate2 from '../luminate/2.png'
import luminateThumbnail from '../luminate/Luminate.png'

import campusEats1 from '../campusEats/1.png'
import campusEats2 from '../campusEats/2.png'
import campusEats3 from '../campusEats/3.png'
import campusEats4 from '../campusEats/4.png'
import campusEatsThumbnail from '../campusEats/CampusEats.png'

export const fitkit = {
  thumbnail: fitkitThumbnail,
  prd: [fitkit1, fitkit2, fitkit3, fitkit4],
}

export const luminate = {
  thumbnail: luminateThumbnail,
  prd: [luminate1, luminate2],
}

export const campusEats = {
  thumbnail: campusEatsThumbnail,
  prd: [campusEats1, campusEats2, campusEats3, campusEats4],
}
