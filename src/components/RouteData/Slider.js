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

import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "./Slider.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const Slider = function (props) {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    if (pictures.length > 0) return;
    (async function () {
      try {
        const docRef = await firebase
          .firestore()
          .collection("routes")
          .doc(`${props.routeId}`);
        const document = await docRef.get();
        const userUid = document.data().userUid;

        const storageRef = await firebase.storage().ref();

        const listAll = await storageRef
          .child(`usersTest/${userUid}/routes/${props.routeId}`)
          .listAll();

        const urls = await Promise.all(
          listAll.items.map((item) => {
            return (async () => {
              try {
                const src = await item.getDownloadURL();
                return src;
              } catch (error) {
                alert(error);
              }
            })();
          })
        );
        setPictures(urls);
      } catch (error) {
        alert(error);
      }
    })();
  }, [pictures.length, props.routeId]);

  useEffect(() => {
    if (props.urls) {
      setPictures(props.urls);
    }
  }, [props.urls]);

  return (
    <>
      {pictures.length > 0 ? (
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={5000}
          // bullets={true}
        >
          {pictures.map((url) => (
            <div data-src={url} key={url.slice(0, 10)} />
          ))}
        </AutoplaySlider>
      ) : (
        ""
      )}
    </>
  );
};
