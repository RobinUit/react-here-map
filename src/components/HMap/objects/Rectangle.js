import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";
import initMapObjectEvents from "../../../libs/initMapObjectEvents";

function Rectangle(props) {
  const {
    map,
    points,
    options,
    setViewBounds,
    objectEvents,
    platform,
    ui,
    __options
  } = merge({ setViewBounds: true }, props);
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!points || points.length !== 4) {
    throw new Error("points should be an array of four items");
  }

  // Get a bounding box
  const boundingBox = new H.geo.Rect(
    points[0],
    points[1],
    points[2],
    points[3]
  );

  // Create an rectangle
  const rectangle = new H.map.Rect(boundingBox, options);

  // Add event listener to the object if intention of using the object is defined
  initMapObjectEvents(rectangle, objectEvents, __options);

  // Add a rectangle to the map
  map.addObject(rectangle);
  if (setViewBounds) {
    // Zoom the map to make sure the whole rectangle is visible:
    map.setViewBounds(rectangle.getBounds());
  }

  // There is no need to render something useful here, HereMap does that magically
  return <div style={{ display: "none" }} />;
}

Rectangle.propTypes = {
  options: PropTypes.object,
  points: PropTypes.array.isRequired,
  map: PropTypes.object,
  objectEvents: PropTypes.object
};

export default Rectangle;
