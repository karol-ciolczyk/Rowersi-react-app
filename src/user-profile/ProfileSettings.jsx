import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from '@material-ui/core/styles';

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
  
  
    

export function ProfileSettings() {
    const classes = useStyles();

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
