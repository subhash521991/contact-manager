import React from 'react'
import { ContactService } from '../../../services/ContactService';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const EditContact = () => {
  let { ContactId } = useParams();
  let navigate = useNavigate();
  let [state, setState] = React.useState({
    loding: false,
    contact:  {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
      
      },
      groups: [],
    errorMessage: ''
    
  });

  let updateInput = (event) =>{
    setState({
    ...state,
    contact: {
    
      ...state.contact,
      [event.target.name]: event.target.value
    
    }
    
    
    });
    };

  React.useEffect(() => {
    async function fetchData() {
      try {
       setState({...state, loding: true});

        let response = await ContactService.getContact(ContactId);
        let groupResponce = await ContactService.getGroups();
        //let groupResponce = await ContactService.getGroup(response.data)
        //console.log(response.data);
        setState({...state, loding: false, contact: response.data, groups: groupResponce.data});

      }
      catch (error) {

        setState({

          ...state,
          loading: false,

          errorMessage: error.message
        
        });

      }
    }
    fetchData();
  }, [ContactId]);

  let submitForm = (event) => {
    event.preventDefault();
    //alert('Hi Data');
  async function submitData(){
  try{
  let responce = await ContactService.updateContact(state.contact, ContactId);
  
  if(responce){
  
    navigate("/contacts/list", { replace: true });
  
  }
  
  }
  catch(error){
  
    navigate("/contacts/add", { replace: false });
  
  
  }
  }
  submitData();
  }

  let {loding, contact, errorMessage, groups} = state;
  return (
    <React.Fragment>
      <pre>{JSON.stringify(state.contact)}</pre>
      <section className='add-contact p-3'>
        <div class="container">
          <div class="row">
            <div class="col">
              <p className='h3 text-success fw-bold'>Edit Contact</p>
              <p className='fst-italic'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
            </div>
          </div>
          <div class="row align-items-center">
            <div className='col-md-4'>
              <form onSubmit={submitForm}>
                <div className='mb-2'>
                  <input 
                  required={true}
                  name="name"
                  value={contact.name}
                  onChange={updateInput}
                  type="text" className='form-control' placeholder='Name' />
                </div>
                <div className='mb-2'>
                  <input 
                  required={true}
                  name="photo"
                  value={contact.photo}
                  onChange={updateInput}
                  type="text" className='form-control' placeholder='PhotoUrl' />
                </div>
                <div className='mb-2'>
                  <input 
                  required={true}
                  name="email"
                  value={contact.email}
                  onChange={updateInput}
                  type="text" className='form-control' placeholder='Email' />
                </div>
                <div className='mb-2'>
                  <input 
                  required={true}
                  name="mobile"
                  value={contact.mobile}
                  onChange={updateInput}
                  type="text" className='form-control' placeholder='Mobile' />
                </div>
                <div className='mb-2'>
                  <input 
                  required={true}
                  name="company"
                  value={contact.company}
                  onChange={updateInput}
                  type="text" className='form-control' placeholder='Company' />
                </div>
                <div className='mb-2'>
                  <input 
                  required={true}
                  name="title"
                  value={contact.title}
                  onChange={updateInput}
                  type="text" className='form-control' placeholder='Title' />
                </div>
                <div className='mb-2'>
                <select 
required={true}
name="groupId"
value={contact.groupId}
onChange={updateInput}
className='form-control'>
<option value="">Select a Group</option>
{
groups.length > 0 &&

groups.map(group=>{

return(

<option key={group.id} value={group.id}>{group.name}</option>

)

})

}
</select>
                </div>
                <div className='mb-2'>
                  <input type="submit" className='btn btn-success' value="Update" />
                </div>

              </form>
            </div>
            <div className='col-md-6'>
            <img src={contact.photo} class="img-fluid rounded-top contact-img" alt="User Img" />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default EditContact