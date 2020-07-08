import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import "./Form.css";

const Form = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: "100%",
                color: "white",
            },

            '& .MuiInputBase-root ': {
                borderColor: "white",
                color: "white",
                marginTop: "1.2em",

                '& input, textarea': {
                    padding: "7px 10px"
                }
            },

            '& .MuiFormLabel-root' : {
                color: "rgba(29,191,115,0.74)",
                fontSize: "1.2em"
            },

            '& .Mui-focused ': {
              color: "white",
            },

            '& .MuiInput-underline:after': {
                borderBottom: '2px solid white',
            }


        },
    }));

    const [errorMsgState, setErrorMsgState] = useState({
            errFullName: null,
            errEmail: null,
            errMessage: null,
        });


    const [errorState, setErrorState] = useState({
        fullName: "",
        email: "",
        message: ""
    });

    const classes = useStyles();

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const validateForm = () => {
        let valid = true;
        console.log(errorState)
        Object.values(errorState).forEach(
            (val) => val.length > 1 && (valid = false)
        );
        return valid;
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        console.log(name, 'name')
        console.log(value, 'value')
        // let errorsMsg = errorMsgState;

        console.log(errorState);

        console.log()
        switch (name) {
              case 'fullName':
                  errorState.fullName =
                  value.length < 5
                    ? 'Full Name must be 5 characters long!'
                    : '';
                break;
              case 'email':
                  errorState.email =
                  validEmailRegex.test(value)
                    ? ''
                    : 'Email address is not valid!';
                break;
              case 'message':
                  errorState.message =
                  value.length < 8
                      // console.log(errors.message = value.length < 8)
                    ? 'Please fill out message'
                    : '';
                break;
              default:
                break;
        }
        // setErrorState({[name]: value});
        setErrorMsgState({errorMsgState: {[name]: value }});
    }

    // const errors = errorState.errors;

   const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm(errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
      }

    console.log(errorState)
    console.log(errorState.email, "email")
    const {errors} = errorState;


    return (
        <Grid item xl={5} sm={8} xs={10}>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="standard-error-helper-text"
//                       //   label={errors.fullName.length > 0 && errors.fullName}
                         label={errorState.fullName}
                        name='fullName'
                        placeholder="Name"
                        defaultValue=""
                        // helperText="Enter full Name"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        id="standard-error-helper-text"
                        // label={errors.email.length > 0 && errors.email}
                        label={errorState.email}
                        name="email"
                        placeholder="Email"
                        defaultValue=""
                        // helperText="Enter email Address."
                         onChange={(e) => handleChange(e)}
                    />

                    <TextField
                        id="standard-multiline-static"
                        label={errorState.message}
                        name="message"
                        multiline
                        rows={4}
                        placeholder="Your Message"
                        defaultValue=""
                        // helperText="Please fill out message"
                         onChange={(e) => handleChange(e)}
                    />

                    <Button onClick={(e) => handleSubmit(e)}>Submit</Button>

                </div>
            </form>
        </Grid>
    )
};

export default Form;

