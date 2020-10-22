import React, { Component, useState } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as Actions from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './home.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {withRouter} from 'react-router-dom';

const Home=(props)=>{



    const [redirect,setRedirect]=useState(false);
    const [activeScreen,setActiveScreen]=useState("login");
     const [phone,setPhone]=useState("");
     const [isOtpSent,setIsOtpSent]=useState(false)
     const [otp,setOTP]=useState('');

     const [email,setEmail]=useState("")
     const [first_name,setFirstName]=useState("")
     const [last_name,setLastName]=useState("");
     const [address,setAddress]=useState("");
     const [phone2,setPhone2]=useState('');

  

useState(()=>{

if(props.state.user)
{
    setRedirect(true);

}

},[])


const submitHandler=()=>
{

    if(!(phone && otp))
    {
      alert("All Field Required");
    }

    fetch("https://calendlio.sarayulabs.com/api/auth/login",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            "otp": otp,
            "phone_number":"+"+phone,
        })
    }).then(res=>res.json()).then(res=>{

        console.log(res)

        props.addUser(res);

             
    setRedirect(true);

       
    
    
    
    }).catch(error=>{
        alert(error);
    })


 
    
}



const sendOTP=()=>
{

    console.log('+'+phone)
    if(!(phone))
    {
      alert("Please Enter phone number");
    }

    fetch("https://calendlio.sarayulabs.com/api/verification/phone",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            phone_number:"+"+phone,
        })
    }).then(res=>{    

        console.log(res)
    
        setIsOtpSent(true);
    }).catch(error=>{
        alert(error);
    })


 
    
}


const onRegister=()=>{
if(!(email && first_name && last_name && address && phone2))
{
    alert("All Fields required");
    return;
}

    fetch("https://calendlio.sarayulabs.com/api/auth/register",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "address": address,
        "phone_number": '+'+phone2
    }
    )
}).then(res=>res.json()).then(res=>{

  
    props.addUser(res);
    console.log(res)
         
    setRedirect(true);

  


}).catch(error=>{
    alert(error);
})

}


        if(redirect)
        {
           props.history.push("/bookings");
        }
        return (
            <div className='outerContainer'>

        <div className='FormContainer'>
            <div style={{display:'flex',flexDirection:"row"}}>
            <h2 onClick={()=>{setActiveScreen('login')}} className="loginDivButton">Login</h2>

            <h2> / </h2>

            <h2 onClick={()=>{setActiveScreen('register')}} className="registerDivButton" >Register</h2>

            </div>
            {
                activeScreen==='login'?
                <div style={{alignSelf:'center',width:'90%'}}>
           
           <h4>Phone Number:-</h4>
           <div className='mardiv'>
           <PhoneInput
  country={'in'}
  value={phone}
  onChange={phone => setPhone(phone)}
/>

<button className='otpButton' onClick={sendOTP} > Send OTP</button>
            </div>

{
    isOtpSent?
    <div>
    <div className='mardiv'>
         <input className='emailInput' placeholder='Enter OTP' onChange={(e)=>setOTP(e.target.value)} />   
    </div>
    <div className='mardiv'>
             <button className='submitButton' onClick={submitHandler} >Login</button>
             </div>
    </div>
    :null
}           
            
            </div>:
            <div style={{alignSelf:'center',width:'90%'}}>
                   <h4>Email</h4>
                 <div className='mardiv'>
                   
             <input className='nameInput' name='email'  onChange={(e)=>setEmail(e.target.value)} />
            </div>

         
           
            <h4>First Name</h4>
            <div className='mardiv'>
            
             <input className='nameInput' name='first_name'  onChange={(e)=>setFirstName(e.target.value)}  />
             </div>
             <h4>Last Name</h4>
             <div className='mardiv'>
            
             <input className='nameInput' name='last_name'  onChange={(e)=>setLastName(e.target.value)}  />
            </div>
            <h4>Address</h4>
            <div className='mardiv'>
            
             <input className='nameInput' name='address'  onChange={(e)=>setAddress(e.target.value)}  />
            </div>
            
            <h4>Phone Number:-</h4>
           <div className='mardiv'>
           <PhoneInput
  country={'in'}
  value={phone2}
  onChange={phone => setPhone2(phone)}
/>
</div>

             <div className='mardiv'>
             <button className='submitButton' onClick={onRegister} > Register</button>
             </div>
             </div>
           

    }
            </div>
            </div>
          );
    }
const mountStateToProps=(state)=>({
state:state
})

const mountDispatchToProps=(dispatch)=>({

addUser:(payload)=>{dispatch(Actions.AddUser(payload))}

})
    

export default  connect(mountStateToProps,mountDispatchToProps)(withRouter(Home));