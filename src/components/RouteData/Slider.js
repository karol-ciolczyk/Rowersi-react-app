// import AutoplaySlider from "react-awesome-slider";
// import AwesomeSliderStyles from "react-awesome-slider";

// export function Slider(props) {
//   const urlsArray = props.routeData.urls;

//   return (
//     <AutoplaySlider
//       play={true}
//       cancelOnInteraction={false}
//       interval={3000}
//       cssModule={AwesomeSliderStyles}
//     >
//       {urlsArray.map((url) => (
//         <div data-src={url} key={url.slice(0, 5)} />
//       ))}
//     </AutoplaySlider>
//   );
// }

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const Slider = function (props) {
  const urlsArray = props.urls ? props.urls : [];

  console.log("---------------", urlsArray);

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={3000}
    >
      {urlsArray.map((url) => (
        <div data-src={url} key={url.slice(0, 5)} />
      ))}
    </AutoplaySlider>
  );
};
