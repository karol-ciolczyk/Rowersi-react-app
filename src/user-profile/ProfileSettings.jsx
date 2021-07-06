import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export function ProfileSettings() {
    return (
        <>
        <span>HERE BE options to change profile </span>
        <Button 
         variant="contained"
         color="primary"
         startIcon={<CloudUploadIcon />}
        >
            Upload avatar picture
        </Button>    
        </>
    )
}