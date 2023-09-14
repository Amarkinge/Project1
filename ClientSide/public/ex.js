import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";


const AddUserForm = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    otp: "", // New property for storing the OTP
    isOtpSent: false, // Flag to track if OTP has been sent
    isVerified: false,
    

  });
  const cityPincodeMapping = {
    // Example mapping, replace with actual data
    "Pune": ["411001","411023", "411044","410506","412115","412210","412206","412305","412212","410503","413801","413102","413106","410502","410501"],
    "Mumbai": ["400001", "400002", "400003", "400004", "400005", "400006", "400007", "400008", "400009", "400010", "400011", "400012", "400013", "400014", "400015", "400016", "400017", "400018", "400019", "400020"],
    "Amravati":["444709"],
    // ... Add more cities and their pin codes here
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value  });


   





    if (name === "city") {
      // Validate the pin code based on the selected city
      const selectedCity = value;
      const enteredPincode = user.pincode;
      
      if (cityPincodeMapping[selectedCity] && !cityPincodeMapping[selectedCity].includes(enteredPincode)) {
        document.getElementById("city").value = null;
        toast.error("Invalid Pincode for the selected city", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const saveUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((res) => {
        if (res) {
          toast.success("Register Successful", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/user/login");
          }, 3000); // Redirect after 3 seconds
        }
      });
    });
  };

  //Email verification
  const generateOTP = () => {
    const email = document.getElementById('emailId');
    const generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
    const emailBody = `
      
      Your OTP is: ${generatedOTP}
    `;

    emailjs
      .send(
        "service_3bnbd0q",
        "template_2z252pd",
        {
          recipent: user.emailId,
          message: emailBody,
        },
        "eVM0F7QSp1a_QkfBi"
      )
      .then((response) => {
        console.log("Email sent:", response);
        setUser({ ...user, otp: generatedOTP, isOtpSent: true });
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
    console.log(user.otp);
    console.log(user.enteredOTP);
    if (user.otp == user.enteredOTP) {
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
      setUser({ ...user, isVerified: true })

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


  //Mobile verfication


  // const handleUserInput1 = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };


  // const generateOTP1 = () => {
  //   const generatedOTP1 = Math.floor(100000 + Math.random() * 900000);
    
  //   // Initialize MessageBird with your MessageBird API key
  //   const client = messagebird("YOUR_MESSAGEBIRD_API_KEY");

  //   const recipient = user.phoneNo;
  //   const text = `Your OTP is: ${generatedOTP1}`;

  //   client.messages.create({
  //     originator: "YOUR_MESSAGEBIRD_PHONE_NUMBER",
  //     recipients: [recipient],
  //     body: text,
  //   }, (err, response) => {
  //     if (err) {
  //       console.error("Error sending SMS:", err);
  //       toast.error("Error sending OTP SMS!", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     } else {
  //       console.log("SMS sent:", response);
  //       setUser({ ...user, otp1: generatedOTP1, isOtpSent1: true });
  //       toast.success("OTP has been sent to your mobile!", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //   });
  // };

  // const verifyOTP1 = () => {
  //  console.log(user.otp1)
  //  console.log(user.enteredOTP1)

  //   if (user.otp1 === user.enteredOTP1) {
  //     // OTP verification successful, you can proceed with registration
  //     toast.success("Correct OTP", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     console.log("You entered correct otp");
  //     setUser({ ...user, isVerified: true });
  //   } else {
  //     document.getElementById("phoneNo").value = ""; // Clear entered OTP field
  //     toast.error("Invalid OTP, please try again!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  





  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          class="card form-card border-color text-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 class="card-title">Add User</h5>
          </div>
          <div class="card-body">
            <form onSubmit={saveUser}>
              <div class="mb-3 text-color">
                <label for="role" class="form-label">
                  <b>User Role</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="role"
                >
                  <option value="0">Select Role</option>
                  {/* <option value="Admin"> Admin </option> */}
                  <option value="Customer"> Customer </option>
                  <option value="Delivery"> Delivery Person </option>
                </select>
              </div>

              <div class="mb-3 text-color">
                <label for="title" class="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                  required
                />
              </div>
              <div class="mb-3 text-color">
                <label for="description" class="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                  required
                />
              </div>

              <div className="mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  class="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  <b>OTP</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="enteredOTP"
                  onChange={handleUserInput}
                  value={user.enteredOTP}
                  required={user.isOtpSent}
                />
              </div>
              {user.isOtpSent ? (
                <button onClick={verifyOTP} className="btn btn-primary">
                  Verify OTP
                </button>
              ) : (
                <button onClick={generateOTP} className="btn btn-primary">
                  Generate OTP
                </button>
              )}

              <div class="mb-3 mt-1">
                <label for="quantity" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                  required
                />
              </div>

             

              <div class="mb-3">
                <label for="price" class="form-label">
                  <b>Mobile No</b>
                </label>
                <input
                  type="integer"
                  class="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={handleUserInput}
                  value={user.phoneNo}
                  required
                />
              </div>


              {/* <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  <b>OTP</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp1"
                  name="enteredOTP1"
                  onChange={handleUserInput1}
                  value={user.enteredOTP1}
                  required={user.isOtpSent1}
                />
              </div>
              {user.isOtpSent1 ? (
                <button onClick={verifyOTP1} className="btn btn-primary">
                  Verify OTP
                </button>
              ) : (
                <button onClick={generateOTP1} className="btn btn-primary">
                  Generate OTP
                </button>
              )} */}

              <div class="mb-3">
                <label for="description" class="form-label">
                  <b> Street</b>
                </label>
                <textarea
                  class="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  onChange={handleUserInput}
                  value={user.street}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="pincode" class="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                  required
                />
              </div>

              

              <input
                type="submit"
                class="btn bg-color custom-bg-text"
                value="Register User"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;