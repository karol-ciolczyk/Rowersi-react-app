import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase";
import { useContext } from "react";
import UserSessionContext from '../components/context/userSession-context.js';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));
  
const addUserBackgroundToFirebase = function (file, uid) {
    firebase
      .storage()
      .ref("usersTest/" + uid + "/wallpaper/background.jpg")
      .put(file);
  }

const addUserAvatarToFirebase = function (file, uid) {
    firebase
      .storage()
      .ref("usersTest/" + uid + "/avatar/avatar.jpg")
      .put(file);
  }  

export function ProfileSettings() {
    const classes = useStyles();

    const userSessionContext = useContext(UserSessionContext);
    const { userUid } = userSessionContext;

  console.log("#48 uid: " + userUid);
  return (
    <>
      <div className={classes.root}>
        <input accept="image/*" type="file" id="uploadAvatarPicture" className={classes.input} />
        <label htmlFor="uploadAvatarPicture">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload avatar picture
          </Button>
        </label>
        <input accept="image/*" type="file" id="uploadProfileWallpaper" className={classes.input} />
        <label htmlFor="uploadProfileWallpaper">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload profile wallpaper
          </Button>
        </label>
      </div>
    </>
  );
}
