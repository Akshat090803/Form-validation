import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {useNavigate, useOutletContext} from "react-router-dom"

const countriesAndCities = {
  India: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Kota'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  UK: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
};

function FormPage() {
const navigate=useNavigate()
  const { setDetails } = useOutletContext();

    const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    userEmail: '',
    password: '',
    code: '+91', // Default for India
    phone: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });


  // For cities dropdown
  const [availableCities , setAvailableCities]=useState([]);

  //!use effect to set available cities for the respective country so that only cities of that country will be shown
  useEffect(()=>{
     if (formValues.country) {
      setAvailableCities(countriesAndCities[formValues.country] || []);
      setFormValues(prev => ({ ...prev, city: '' })); // Reset city when country changes
    } else {
      setAvailableCities([]);
    }
  },[formValues.country])

  
  const [showPassword,setShowPassword]=useState(false)
  const [formErrors,setFromErrors]=useState({
     
  })

  const handlePasswordToggle=()=>{
    setShowPassword(prev=>!prev)
  }

  const handleChange=(e)=>{
    const key=e.target.name;
    const value=e.target.value

    //check if error for particular field exist and if yes on change remove the key so that error also rmeoved
        if(Object.keys(formErrors).length>0 && key in formErrors ){
            const newObj={...formErrors}
            delete newObj[key];
            setFromErrors(newObj)
        }
          setFormValues((prev)=> {
            return {
              ...prev, 
              [key]:value
            }
          })
  }

  //! functions to validate fields value
  const validate=(values)=>{
    const errors = {};
    const nameRegex= /^[a-zA-Z]+$/

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex for correct email format
    const phoneRegex = /^\d{10}$/;  //regex for phone no. that it will be only numeric and 10 digits long
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; //regex for pan 
    const aadharRegex = /^\d{12}$/; //regex for aadhar
    const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_.]*$/;

    //!vlaidation conditions 
    //for first Name
    if (!values.firstName) {
      errors.firstName = 'First Name is required!';
    }
    else if(!nameRegex.test(values.firstName)){
      errors.firstName = 'Name must contain only letters!'
    }
    // for lastanme
    if (!values.lastName) {
      errors.lastName = 'Last Name is required!';
    }else if(!nameRegex.test(values.lastName)){
      errors.lastName = 'Name must contain only letters!'
    }

    //for username
    if (!values.userName) {
      errors.userName = 'Username is required!';
    }
    else if(!usernameRegex.test(values.userName)){
               errors.userName='Username must start with a letter, or underscore, and can contain letters, digits, underscores, and dots.'
    }
    //for email
    if (!values.userEmail) {
      errors.userEmail = 'Email is required!';
    } else if (!emailRegex.test(values.userEmail)) {
      errors.userEmail = 'Invalid email format!';
    }
    // for passowrd
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters!';
    }
    // for phone number
    if (!values.phone) {
      errors.phone = 'Phone Number is required!';
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = 'Phone Number must be 10 digits!';
    }
    // for country
    if (!values.country) {
      errors.country = 'Country is required!';
    }
    //for city
    if (!values.city) {
      errors.city = 'City is required!';
    }
    // for panNo
    if (!values.panNo) {
        errors.panNo = 'PAN Number is required!';
    } else if (!panRegex.test(values.panNo.toUpperCase())) {
        errors.panNo = 'Invalid PAN Number format (e.g., ABCDE1234F)!';
    }
    //for adharNo
    if (!values.aadharNo) {
        errors.aadharNo = 'Aadhar Number is required!';
    } else if (!aadharRegex.test(values.aadharNo)) {
        errors.aadharNo = 'Aadhar Number must be 12 digits!';
    }

    return errors;
  }

  //! Form submit handler
const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validate(formValues);
  setFromErrors(errors);

  if (Object.keys(errors).length === 0) {
                  
    //passing formValues through useNavigate hook 
        // navigate("/details", { state: { details: formValues } });

     setDetails(formValues);
     navigate("/details");   
  }
};

  return (
    <>
      <h1>Form Validation</h1>

      <div>

{/* form  */}
        <form className="form" onSubmit={handleSubmit}>
          <table  className="table"  >
            <tbody >
              {/* first Name */}
               <tr>
                   <td> <label htmlFor="firstName">First Name:</label></td>
                 <td><div>
                  <input  type="text" className={formErrors.firstName && "error"} value={formValues.firstName} id="firstName" name="firstName" onChange={handleChange}/> 
                  {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}
                 </div>
                  </td>
                </tr>

                {/* last Name */}
              <tr >
                <td><label htmlFor="lastName">Last Name :</label></td>
                <td> <div>
                  <input type="text" id="lastName" value={formValues.lastName} className={formErrors.lastName && "error"} name="lastName" onChange={handleChange} />
                   {formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}
                  </div></td>
              </tr>
              
              {/* user Name */}
              <tr>
                    <td> <label htmlFor="userName">User Name:</label></td>
                    <td><div>
                      <input type="text" id="userName" name="userName" value={formValues.userName} className={formErrors.userName && "error"} onChange={handleChange} /> 
                        {formErrors.userName && <p className="error-message">{formErrors.userName}</p>}
                      </div> </td>
              </tr>

              {/* email */}
              <tr>
                    <td> <label htmlFor="userEmail">User Email:</label></td>
                    <td><div>
                      <input type="text" id="userEmail" name="userEmail" value={formValues.userEmail}  className={formErrors.userEmail && "error"} placeholder="e.g., abc@example.com" onChange={handleChange} />
                        {formErrors.userEmail && <p className="error-message">{formErrors.userEmail}</p>}

                       </div> </td>
              </tr>
              {/* password */}
              <tr>
                    <td> <label htmlFor="password">Password:</label></td>
                    <td><div>
                      <div  className="pass-div">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" value={formValues.password}  className={`${formErrors.password && "error"} passinput`} onChange={handleChange} /> 
                        
                       { formValues.password &&  (!showPassword ? <IoEye onClick={handlePasswordToggle} className="icon" /> : <IoEyeOff onClick={handlePasswordToggle} className="icon"/>)}
                      </div>
                        {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                        </div>
                         </td>
              </tr>
              {/* country code */}
               <tr>
                    <td> <label htmlFor="code">Country Code:</label></td>
                    <td>  <select name="code" id="code" style={{width:"100%", height:"1.5rem"}} value={formValues.code} onChange={handleChange}>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA/Canada)</option>
              <option value="+44">+44 (UK)</option>
            </select></td>
              </tr>
              {/* phone */}
              <tr>
                    <td> <label htmlFor="phone" >Phone No.:</label></td>
                    <td><div>
                      <input type="text" id="phone" name="phone" value={formValues.phone}  className={formErrors.phone && "error"} placeholder="e.g., 9876543210" onChange={handleChange}/>
                        {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}</div>  </td>
              </tr>
{/* country */}
              <tr>
                <td><label htmlFor="country">Country:</label></td>
                <td>
                 <div>
                   <select name="country" value={formValues.country}  className={formErrors.country && "error"} id="country" style={{width:"100%", height:"1.5rem"}} onChange={handleChange}>
                    <option value="">Select Country</option>
                     {Object.keys(countriesAndCities).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
                  </select>
                    {formErrors.country && <p className="error-message">{formErrors.country}</p>}
                 </div>
                  
                </td>
              </tr>
{/* city */}
               <tr>
                <td><label htmlFor="city">City:</label></td>
                <td>
                 <div>
                   <select name="city" id="city" value={formValues.city}  className={formErrors.city && "error"}
                  disabled={!formValues.country} style={{width:"100%", height:"1.5rem"}} onChange={handleChange}>
                    <option value="">Select City</option>
                     {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
                  </select>
                    {formErrors.city && <p className="error-message">{formErrors.city}</p>}
                 </div>
                  
                </td>
              </tr>
{/* pan No. */}
                <tr>
                    <td> <label htmlFor="panNo">Pan No.:</label></td>
                    <td><div>
                      <input type="text" id="panNo" value={formValues.panNo} name="panNo"   className={formErrors.panNo && "error"}   placeholder="ABCDE1234F" onChange={handleChange} /> 
                        {formErrors.panNo && <p className="error-message">{formErrors.panNo}</p>}</div> </td>
              </tr>
{/* Aadhar No. */}
               <tr>
                    <td> <label htmlFor="aadharNo">Aadhar No.:</label></td>
                    <td><div>
                      <input type="text" id="aadharNo" value={formValues.aadharNo} name="aadharNo" className={formErrors.aadharNo && "error"}  placeholder="123456789012" onChange={handleChange}/> 
                     {formErrors.aadharNo && <p className="error-message">{formErrors.aadharNo}</p>}</div> </td>
              </tr>
             
              
             
            </tbody>
          </table>

           <button className="btn" disabled={Object.keys(formErrors).length>0}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default FormPage
