import AutoplaySlider from "react-awesome-slider/hoc/autoplay";
import AwesomeSliderStyles from "react-awesome-slider/src/styled/fold-out-animation.scss";

export function Slider(props) {
  const urlsArray = props.routeData.urls;

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false}
      interval={6000}
      cssModule={AwesomeSliderStyles}
    >
      {urlsArray.map((url) => (
        <div data-src={url} key={url.slice(0, 5)} />
      ))}
    </AutoplaySlider>
  );
}
