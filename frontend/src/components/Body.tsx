import React, { ChangeEvent,
  useEffect,
  useState, 
  Fragment, 
  SyntheticEvent } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { DrugAllergyInterface,NurseInterface,DrugInterface,MedicalRecordInterface } from '../models/IUser';

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        
        fullbox:{width :550},
        root: { flexGrow: 1 },

        container: { marginTop: theme.spacing(2) },

        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

        table: { minWidth: 20 },

        textfield: { width: 400, },

        datefield: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    })
);

function createData(name: string, amount: number) {
    return { name, amount };
}

export default function Body() {
    const classes = useStyles();
      useEffect(() => {
      getMedicalRecord();
      getNurse();
      getDrug();
    }, []);

  const [DrugAllergy,setDrugAllergy] = useState<Partial<DrugAllergyInterface>>({});

  const  [AddedTime,setAddedTime] = useState<Date|null>(new Date());
  const handleAddedTime = (date: Date | null) => {
    setAddedTime(date);
  }


  const [MedicalRecord, setMedicalRecord] = useState<MedicalRecordInterface[]>([]);
  const getMedicalRecord = async() => {
      const apiUrl = "http://localhost:8080/api/MedicalRecord";
      const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if(res.data) {
            setMedicalRecord(res.data)
          } else {
            console.log("else")
          }
        });
    }




  const [Nurse, setNurse] = useState<NurseInterface[]>([]);
  const getNurse = async() => {
      const apiUrl = "http://localhost:8080/api/Nurse";
      const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if(res.data) {
            setNurse(res.data)
          } else {
            console.log("else")
          }
        });
    }





  const [Drug, setDrug] = useState<DrugInterface[]>([]);
  const getDrug = async() => {
      const apiUrl = "http://localhost:8080/api/Drug";
      const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if(res.data) {
            setDrug(res.data)
          } else {
            console.log("else")
          }
        });
    }



  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };



  const submitDrugAllergy = () => {
    let data = {
	    NurseID: DrugAllergy.NurseID,
      MedicalRecordID:   DrugAllergy.MedicalRecordID,
      DrugID:  DrugAllergy.DrugID,
      DrugAllergy: DrugAllergy.DrugAllergy,
	    AddedTime:  AddedTime
    };
    

    const apiUrl = "http://localhost:8080/api/submit";
    const requestOptionsPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

       fetch(apiUrl, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
    });
  }









    const handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
      const name = event.target.name as keyof typeof DrugAllergy;
      setDrugAllergy({...DrugAllergy, [name]: event.target.value,});
    }; 







    return (


        <Container className={classes.container} maxWidth="md">

<Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
              
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>



            <Paper className={classes.paper}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            ข้อมูลการบันทึกประวัติการแพ้ยาของผู้ป่วย
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} className={classes.root}>



                  
                <Grid item xs={6}>
                        <p>ชื่อผู้ป่วย</p>
                        <Select variant="outlined"
                            value={DrugAllergy.MedicalRecordID}
                            inputProps={{name: "MedicalRecordID"}}
                            onChange={handleChange}
                            style={{ width: 400 }}
                        >
                            <MenuItem value={0} key={0}>เลือกชื่อผู้ป่วย</MenuItem>
                            {MedicalRecord.map((item: MedicalRecordInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Patient_Name}</MenuItem>))}
                        </Select>
                    </Grid>           


                    <Grid item xs={6}>
                        <p>พยาบาลที่ทำการบันทึก</p>
                        <Select variant="outlined"
                            value={DrugAllergy.NurseID}
                            inputProps={{name: "NurseID"}}
                            onChange={handleChange}
                            style={{ width: 400 }}
                        >
                            <MenuItem value={0} key={0}>เลือกชื่อพยาบาล</MenuItem>
                            {Nurse.map((item: NurseInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.NurseName}</MenuItem>))}
                        </Select>
                    </Grid>      


                    <Grid item xs={6}>
                        <p>ชื่อยา</p>
                        <Select variant="outlined"
                            value={DrugAllergy.DrugID}
                            inputProps={{name: "DrugID"}}
                            onChange={handleChange}
                            style={{ width: 400 }}
                        >
                            <MenuItem value={0} key={0}>เลือกชื่อยา</MenuItem>
                            {Drug.map((item: DrugInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Drug_Name}</MenuItem>))}
                        </Select>
                    </Grid>      


                    <Grid item xs={6}>
                        <FormControl style={{float: "right",width:400,marginRight:27 ,}} variant="outlined">
                          <p>วันที่และเวลาที่ทำการบันทึก</p>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDateTimePicker
                                name="WatchedTime"
                                value={AddedTime}
                                onChange={handleAddedTime}
                                minDate={new Date("2018-01-01T00:00")}
                                format="yyyy/MM/dd hh:mm a"
                            />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                    </Grid>




                    <Grid item xs={12} >
                        <p >อาการแพ้</p>
                        <TextField 
                        id="DrugAllergy" 
                        type="string"
                        inputProps={{name:"DrugAllergy"}}
                        value={DrugAllergy.DrugAllergy|| ""}
                        onChange={handleChange}
                        label="" 
                        variant="outlined" 
                        className ={classes.fullbox}
                         multiline rows={4}/>
                          
                    </Grid>

                    <Grid item xs={12}>
                        <Button style={{ float: "right" }}
                            variant="contained"
                            color="primary"
                            onClick={submitDrugAllergy}
                            // component={RouterLink} 
                            // to="/link/History"
                            >
                            SUBMIT
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>

    )
}
