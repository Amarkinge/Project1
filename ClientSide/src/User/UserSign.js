import React, { useState } from 'react'
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {addUser} from "../Utils/ApiUtilUser"
import "./../Components/Style/login.css"

function UserSign () {

  const [loder , setLoder] = useState(false);
  const [inputdata, setInputData] = useState( {
    Name: "",
    email: "",
    contact: "",
    password: "",
    Confirm_Password: "",
    otp: "", // New property for storing the OTP
    isOtpSent: false, // Flag to track if OTP has been sent
    isVerified: false,
  } );

  const handleInput = ( e ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData( { ...inputdata, [name]: value } );
  }


const [err, setErr]= useState("")

  // const navigate = useNavigate();
  const onSubmitData = async ( e ) => {
    e.preventDefault();
    console.log( inputdata );
    const { Name, email, contact, password, Confirm_Password } = inputdata;

    if ( email === "" )
    {
      toast.error( "Email is required" );
    }
    else if ( Name === "" )
    {
      toast.error( "Enter Valid Email !" )
    }
    else if ( !email.includes( "@" ) )
    {
      toast.error( "Enter Valid Email !" )
    }
    else if ( contact.length < 10 )
    {
      toast.error( "Enter Valid Phone number!" )
    }
    else if ( password === "" )
    {
      toast.error( "Password is required" )
    }
    else if ( password.length < 4 )
    {
      toast.error( "password is too short" )
    }
    else if ( password.length > 20 )
    {
      toast.error( "password is too Long" )
    }
    else if ( Confirm_Password !== password )
    {
      toast.error( "password is not Matching" )
    }
    else
    {
      setLoder(true);
      addUser(inputdata).then(data=>{
        if(data.status==="Failed"){
          setErr("User Email Id Allready Exists")
          setLoder(false)
        }else if(data.status==="Success"){
          toast.success("Register Successfully");
          setLoder(false)
          setErr("")
          setInputData({
            Name: "",
            email: "",
            contact: "",
            password: "",
            Confirm_Password: ""
          })
        }
      });
 
 }


}





//password verification

// const verifyPass = () => {
//   const { Name, email, contact, password, Confirm_Password } = inputdata;
//    if ( password === "" )
//     {
//       toast.error( "Password is required" )
//     }
//     else if ( password.length < 4 )
//     {
//       toast.error( "password is too short" )
//     }
//     else if ( password.length > 20 )
//     {
//       toast.error( "password is too Long" )
//     }
//     else if ( Confirm_Password !== password )
//     {
//       toast.error( "password is not Matching" )
//     }
// };






//Email verification
const generateOTP = () => {
  const email = document.getElementById('emailId');
  const generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  const emailBody = `
    
    Your OTP is: ${generatedOTP}
  `;

  emailjs
    .send(
      "service_9bmfpas",
      "template_ubseduv",
      {
        recipent: inputdata.email,
        message: emailBody,
      },
      "RsKfGBPtV4JyJh9K3"
    )
    .then((response) => {
      console.log("Email sent:", response);
      setInputData({ ...inputdata, otp: generatedOTP, isOtpSent: true });
      toast.success("OTP has been sent to your email!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      console.error("Email error:", error);
      toast.error("Error sending OTP email!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });


}

const verifyOTP = () => {
  if (inputdata.otp == inputdata.enteredOTP) {
    // OTP verification successful, you can proceed with registration
    // 
    toast.success("Correct OTP", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("You entered correct otp");
    setInputData({ ...inputdata, isVerified: true })

  } else {
    document.getElementById("otp").value = null;
    toast.error("Invalid OTP, please try again!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};


  return (
    <>
      <div className="container-of-login-form-in-my-side" id='form'>
      
        <form onSubmit={onSubmitData}>
        <h4 className='fom-name-in-login-form'>Resister Your Account</h4>
        <h6 style={{color:"red"}}>{err}</h6>
          <input type="text" name="Name" className='login-admin-the-css-for-form' onChange={handleInput} placeholder='Name' pattern="[A-Za-z]{1,32}" value={inputdata.Name} required/>

          <input type="email" name="email" className='login-admin-the-css-for-form' onChange={handleInput} placeholder='Email' value={inputdata.email} required/>

          <input type="tel" name="contact" className='login-admin-the-css-for-form' onChange={handleInput} placeholder='Contact' value={inputdata.contact} required/>

          <input
                  type="text"
                  className="login-admin-the-css-for-form"
                  id="otp"
                  name="enteredOTP"
                  onChange={handleInput}
                  placeholder='OTP'
                  value={inputdata.enteredOTP}
                  required
                />
              
              {inputdata.isOtpSent ? (
                <button onClick={verifyOTP} className="btn btn-primary">
                  Verify
                </button>
              ) : (
                <button onClick={generateOTP} className="btn btn-primary">
                  Generate 
                </button>
              )}


          <input type="password" className='login-admin-the-css-for-form' onChange={handleInput} placeholder='password' name='password' value={inputdata.password} required />

          <input type="password" className='login-admin-the-css-for-form' onChange={handleInput} placeholder='Confirm Password' name='Confirm_Password' value={inputdata.Confirm_Password} required />

          <div id="button-container-in-admin-login-page"> <button type='submit' id="button-container-in-admin-login-page-btn" >{loder?<div id="loder-of-the-button-of-the-login-submit"></div>:"Register"}</button></div>

        </form>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
        />
      </div>
    </>
  )
}

export default UserSign



