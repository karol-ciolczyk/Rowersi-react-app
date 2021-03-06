// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";
// import { Button } from "@material-ui/core";
// import { Paper } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     padding: theme.spacing(2, 4, 3),
//   },
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     "& > *": {
//       margin: theme.spacing(1),
//       // width: theme.spacing(16),
//       // height: theme.spacing(16),
//     },
//   },
//   button: {
//     margin: "0px 5px",
//   },
// }));

// export default function TransitionsModal(props) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button
//         className={classes.button}
//         variant="contained"
//         color="secondary"
//         href="#contained-buttons"
//         onClick={handleOpen}
//       >
//         {props.buttonName}
//       </Button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <div className={classes.root}>
//             <Paper elevation={3} className={classes.paper}>
//               {props.children}
//             </Paper>
//           </div>
//         </Fade>
//       </Modal>
//     </>
//   );
// }
