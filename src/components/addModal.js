import React, { Component, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import * as ACTIONS from "../reduxweb/actions";
import { connect } from "react-redux";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    height                : '40vh',
    borderRadius          : '20px',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
   
  }
};


const AddModal=(props)=>{

    const [description,setDescription]=useState("");
    const [start_datetime,setStart_datetime]=useState("");
    const [end_datetime,setEnd_datetime]=useState("");


    const create=()=>{


    

       const item={
           description,
           start_datetime,
           end_datetime,
       }
       console.log(item);
       fetch("https://calendlio.sarayulabs.com//api/bookings",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + props.user.auth_token,
          'Access-Control-Allow-Origin':'*'
        },
        method: "POST",
        body: JSON.stringify(item)
    }).then(res=>res.json()).then(res=>{

        console.log(res)

    

 
       
    
    
    
    }).catch(error=>{
        alert(error);
    })

        setDescription("");
        setStart_datetime("");
        setEnd_datetime('');
        props.close();
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
                 <label for='name'>Description</label>
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

            <button className='modalButton' type='button' onClick={create}>Create Booking</button>
           
          </div>
        </Modal>
)
}

const mapStateToProps = state => ({
  user:state.user,
});

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(ACTIONS.createEvent(item)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModal);