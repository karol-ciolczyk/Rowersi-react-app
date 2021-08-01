import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "./image-gallery.css";
import classes from "./Slider.module.css";

export const Slider = function () {
  const [images, setImages] = useState([]);
  const { routeId } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (images.length > 0) return;
    (async function () {
      try {
        const docRef = await firebase
          .firestore()
          .collection("routes")
          .doc(`${routeId}`);
        const document = await docRef.get();
        const userUid = document.data().userUid;

        const storageRef = await firebase.storage().ref();

        const listAll = await storageRef
          .child(`usersTest/${userUid}/routes/${routeId}`)
          .listAll();

        const images = await Promise.all(
          listAll.items.map((item) => {
            return (async () => {
              try {
                const src = await item.getDownloadURL();
                return {
                  original: src,
                  originalHeight: "400px",
                };
              } catch (error) {
                alert(error);
              }
            })();
          })
        );
        if (isMounted === false) return;
        setImages(images);
      } catch (error) {
        alert(error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [images, routeId]);

  return (
    <div className={classes.slider}>
      <ImageGallery
        showFullscreenButton={false}
        showBullets={true}
        slideInterval={5000}
        showThumbnails={false}
        showPlayButton={false}
        infinite={true}
        autoPlay={true}
        items={images}
      />
    </div>
  );
};
