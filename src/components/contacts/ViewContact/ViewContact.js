import React from 'react'
import { ContactService } from '../../../services/ContactService';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
  let { ContactId } = useParams();
  let [state, setState] = React.useState({
    loding: false,
    contact: {},
    errorMessage: '',
    group: {}
  });
  React.useEffect(() => {
    async function fetchData() {
      try {
       setState({...state, loding: true});

        let response = await ContactService.getContact(ContactId);
        let groupResponce = await ContactService.getGroup(response.data)
        //console.log(response.data);
        setState({...state, loding: false, contact: response.data, group: groupResponce.data});

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

let {loding, contact, errorMessage, group} = state;

  return (
    <React.Fragment>
      <section className='view-contact-intro p-3'>
        <div class="container">
          <div class="grid">
            <div className='row'>
              <div className='col'>
                <p className='h3 fw-bold'>View Contact</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

{

loding? <Spinner /> :
<React.Fragment>
{
Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&

  <section className='view-contact mt-3'>
        <div class="container">
          <div className='row align-items-center d-flex justify-content-around'>
            <div className='col-md-4'>
              <img src={contact.photo} class="img-fluid rounded-top contact-img" alt="User Img" />
            </div>
            <div className='col-md-8'>
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
                <li className='list-group-item list-group-item-action'>
                  Company: <span className='fw-bold'>{contact.company}</span>

                </li>
                <li className='list-group-item list-group-item-action'>
                  Title: <span className='fw-bold'>{contact.title}</span>

                </li>
                <li className='list-group-item list-group-item-action'>
                  Group: <span className='fw-bold'>{group.name}</span>

                </li>
              </ul>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>
            </div>
          </div>
        </div>
      </section>

}
</React.Fragment>

}
    </React.Fragment>
  )
}
export default ViewContact