import React from "react";
import Video from "./video/Video";
import Voice from "./voice/Voice";
import FilterElement from "./filter_elementor/FilterElementor";

const Filter = () => {
  return (
    <div className="Filter-wrapper">
      <FilterElement />
      {/* <Video />
      <Voice /> */}
    </div>
  );
};

export default Filter;
