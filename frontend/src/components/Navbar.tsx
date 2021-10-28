import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      
    },
    title: {
      flexGrow: 1,
    },
    small: {
        marginTop : theme.spacing(0.5),
        marginRight : theme.spacing(2),
        width: theme.spacing(5),
        height: theme.spacing(5),

      },
    leftmagin:{
        marginLeft:theme.spacing(3),
    },
    colorbar:{
        background: 'linear-gradient(45deg, #16DE9D 30%, 70%, #5698F0 100%)',
        
    }
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className={classes.root} >
      <AppBar position="static"className={classes.colorbar} >
        <Toolbar>
          <Typography variant="h6"  className={classes.title}>
             Drug allergy
          </Typography>
          <Button color="inherit" onClick={SignOut}  className={classes.small} >Logout</Button>
          
        </Toolbar>
            
      </AppBar>
    </div>
  );
}