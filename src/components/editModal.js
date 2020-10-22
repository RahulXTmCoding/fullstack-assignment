import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import * as ACTIONS from "../reduxweb/actions";
import { connect } from "react-redux";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    height                : '40vh',
    borderRadius          : '20px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const EditModal=(props)=>{

    
  const [description,setDescription]=useState("");
  const [start_datetime,setStart_datetime]=useState("");
  const [end_datetime,setEnd_datetime]=useState("");


useEffect(()=>{
    if(props.item)
    {
      fetch("https://calendlio.sarayulabs.com/api/bookings/"+props.item,
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + props.user.auth_token,
            'Access-Control-Allow-Origin':'*'
          },
          method: "GET",
       
       
      }).then(res=>res.json()).then(res=>{
    
          setDescription(res.description)
          setStart_datetime(res.start_datetime)
          setEnd_datetime(res.end_datetime)
    
       
    
         
      
      
      
      }).catch(error=>{
          alert(error);
      })

    }
},[])
const edit=()=>{
  fetch("https://calendlio.sarayulabs.com/api/bookings/"+props.item,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.user.auth_token,
        'Access-Control-Allow-Origin':'*'
      },
      method: "PATCH",
      body: JSON.stringify({
        "description": description,
    }
    )
  }).then(res=>res.json()).then(res=>{

      console.log(res)

   

     
  
  
  
  }).catch(error=>{
      alert(error);
  })

  
     
     props.close()
}

    return (
      <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpen}
      onRequestClose={props.close}
      style={customStyles}
      contentLabel="Create Todo"
      overlayClassName="Overlay"
    >

     <div className='modals'>
         <div className='modalItem'>
             <label for='name'>description</label>
        <input className='inputs' name='name' placeholder='' value={description} onChange={(e)=>setDescription(e.target.value)} />
</div>
     
     <div className='modalItem'>
     <label for='date'>Start DateTime</label>
     <DateTimePicker
    onChange={(date)=>setStart_datetime(date)}
    value={start_datetime}
  />
</div>

<div className='modalItem'>
     <label for='date'>End DateTme</label>
     <DateTimePicker
    onChange={(date)=>setEnd_datetime(date)}
    value={end_datetime}
  />
</div>

        <button className='modalButton' type='button' onClick={edit}>Edit Booking</button>
       
      </div>
    </Modal>
)
}

const mapStateToProps = state => ({
  user:state.user
  });
  
  const mapDispatchToProps = dispatch => ({
    editItem: item => dispatch(ACTIONS.editEvent(item)),
  
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditModal);