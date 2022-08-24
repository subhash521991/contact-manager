import axios from 'axios';

export class ContactService {

static serverUrl = `http://localhost:9000`;

static getGroups (){

let dataURL = `${this.serverUrl}/groups`;
return axios.get(dataURL);

}

static getGroup(contact){

    let groupId = contact.groupId;
    let dataURL = `${this.serverUrl}/groups/${groupId}`;
    return axios.get(dataURL);

}

static getAllContacts(){

    let dataURL = `${this.serverUrl}/contacts`;
    return axios.get(dataURL);
}

static getContact(ContactId){

    let dataURL = `${this.serverUrl}/contacts/${ContactId}`;

return axios.get(dataURL);

}

static createContact(contact){

    let dataURL = `${this.serverUrl}/contacts`;
    return axios.post(dataURL, contact);
 

}

static updateContact(contact, ContactId){

    let dataURL = `${this.serverUrl}/contacts/${ContactId}`;
    return axios.put(dataURL, contact);


}

static deletContact(ContactId){
    let dataURL = `${this.serverUrl}/contacts/${ContactId}`;
    return axios.delete(dataURL);


}

}