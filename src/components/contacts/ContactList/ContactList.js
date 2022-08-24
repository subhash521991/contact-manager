import React from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';


const ContactList = () => {

let [state, setState] = React.useState({

loading: false,
contacts: [],
errorMessage: ''

});

React.useEffect(()=>{
  async function fetchData() {
 try {

setState({...state, loading: true});

  let response = await ContactService.getAllContacts(); 
  
   // console.log(response.data);

   setState({
    ...state,
    loading: false,
    contacts: response.data
   });
  
 }
 catch(error){


setState({

  ...state,
  loading: false,
  errorMessage: error.message
});
 }

}
fetchData();
},[]); 
 
/// delete contact 

let clickDelete = (ContactId)=>{

async function deleteData(){

  try{

let response = await ContactService.deletContact(ContactId);

if(response){
  setState({...state, loading: true});
  let response = await ContactService.getAllContacts(); 
   setState({
    ...state,
    loading: false,
    contacts: response.data
   });

}


  }

catch(error){
  setState({

    ...state,
    loading: false,

    errorMessage: error.message
  
  });

}

}
deleteData();

};


let {loading, contacts, errorMessage} = state;

  return (
    <React.Fragment>
      <section className='contact-search p-3'>
        <div class="container">
          <div class="grid">
            <div className='row'>
              <div className='col'>
                <p className='h3 fw-bold'>Contact Manager
                  <Link to={'/contacts/add'} className='btn btn-primary ms-2'><i className='fa fa-plus-circle me-2' />Add New</Link>
                </p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <form className='row'>
                  <div className='col'>
                    <div className='mb-2'>
                      <input type="text" className='form-control' placeholder='Search Name' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='mb-2'>
                      <input type="submit" className='btn btn-outline-dark' value="Search" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
      {

loading ?<Spinner />: <React.Fragment>

<section className='contact-list'>
        <div class="container">
          <div class="row">
            {

contacts.length > 0 &&

contacts.map((contact)=>{

return(
  <div className='col-md-6' key={contact.id}>
  <div class="card">
    <div class="card-body">
      <div className='row align-items-center d-flex justify-content-around'>
        <div className='col-md-4'>
          <img src={contact.photo} class="img-fluid rounded-top contact-img" alt="User Img" />
        </div>
        <div className='col-md-7'>
         <ul className='list-group'>
          <li className='list-group-item list-group-item-action'>
           Name: <span className='fw-bold'>{contact.name}</span>

          </li>
          <li className='list-group-item list-group-item-action'>
           Mobile: <span className='fw-bold'>{contact.mobile}</span>

          </li>
          <li className='list-group-item list-group-item-action'>
           Email: <span className='fw-bold'>{contact.email}</span>

          </li>
         </ul>
        </div>
        <div className='col-md-1 d-flex flex-column align-items-center'>
         <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1"><i className='fa fa-eye' /></Link>
         <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1"><i className='fa fa-pen' /></Link>
       <button className='btn btn-danger my-1' onClick={() =>clickDelete(contact.id)}><i className='fa fa-trash' /></button>
         
        </div> 

      </div>


    </div>
  </div>

</div>

)


})
              
            }
           
           

          </div>
        </div>

      </section>

</React.Fragment>

      }
      
      


    </React.Fragment>
  )
}

export default ContactList