import './App.css';
import './Styles/RegistrationForm.css'
import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios';


function App() {  
  
  const [isLoading, setLoading] = useState(true)
  const [formData, getFormLabels] = useState(null)

  const[goodPassword, checkPassword] = useState(true)
  let displayPassword = false
  

  let formSend = false
  let requestData = {
    email: useRef(),
    firstName: useRef(),
    lastName: useRef(),
    newsLetter: useRef(),
    password: useRef(),
    privacyPolicy: useRef(),
    terms: useRef(),
    salutation: useRef(),
  }

  useEffect(() => {
    getFormData()
    
  }, [])

  useEffect(() => {
    console.log("GoodPassword")
    
  }, [goodPassword])

  
  const getFormData = () => {
    axios.get("http://localhost:3000/registrationLabels")
        .then(response => {
          getFormLabels(response.data)
          setLoading(false) ;
        })
        .catch(error => console.error('Error: ' . error))
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  function checkPasswordStrenght(event){

    let currentPassword = event.target.value

    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(spChars.test(currentPassword)){
      checkPassword(false);
    }

    if(currentPassword.length <= 8){
      checkPassword(false);
    }

    if(/[a-z][A-Z]/.test(currentPassword)){
      checkPassword(true);
    }
    
  }

  function getSalutation(event){

    requestData.salutation =  event.target.getAttribute('data-name')

  }

  function checkBoxCheck(checkbox){
    if(checkbox == 'on') return true
    
    return false
  }

  function requestCleanUp(){
    let cleanRequestData = {
      email: requestData.email.current.value,
      firstName: requestData.firstName.current.value,
      lastName: requestData.lastName.current.value,
      newsletter: checkBoxCheck(requestData.newsLetter.current.value),
      password: requestData.password.current.value,
      privacyPolicy: checkBoxCheck(requestData.privacyPolicy.current.value),
      terms: checkBoxCheck(requestData.terms.current.value),
      salutation: requestData.salutation,
    }

    return cleanRequestData
  }

  
  function sendFormData(e){
    e.preventDefault()

    const axiosRequestData = requestCleanUp();
    
    console.log(axiosRequestData);
    axios.post('http://localhost:3000/createUser', axiosRequestData)
        .then(response => {
          if(response.statusText == "Created"){
            
            formSend = true
            alert('User Succesfully Created:')
          }else{
            formSend = false
          }
          
          console.log(formSend)
        });
  }

  return (
    <>
    <div className="App">
      <form onSubmit={sendFormData} className='registrationForm'>
          <div className='--title'>
              {formData.RegistrationTitle}
          </div>

          <div className='--introduction'>
              {formData.RegistrationIntroductionText}
          </div>

          <div className='--firstCheckboxContainer'>
            <span>Anrede</span>
            {formData.SalutationSource.map((value, index) => {
              return <label><input required ref={requestData.salutation} data-name={value.ID} name="action" className='__checkbox_container' type="radio" onChange={getSalutation}/> {value.Name} </label>
            })}
            
          </div>

          <div className='--inputContainer'>
            <input ref={requestData.firstName} className='__input' type="text"  placeholder={formData.FirstName.FieldLabel} required/>
          </div>

          <div className='--inputContainer'>
          <input ref={requestData.lastName} className='__input' type="text"  placeholder={formData.LastName.FieldLabel} required/>
          </div>

          <div className='--inputContainer'>
          <input ref={requestData.email} className='__input' type="email"  placeholder={formData.Email.FieldLabel} required/>
          </div>

          <div className='--inputContainer'>
          <input ref={requestData.password} className={'__input ' + (goodPassword ? 'goodPassword' : 'badPassword')} type="password"  placeholder={formData.Password.FieldLabel} required onChange={checkPasswordStrenght}/>
            <span className='__passwordInstructions'>
              -{formData.Password.LetterRule}<br></br>
              -{formData.Password.NumberRule}<br></br>
              -{formData.Password.SpecialCharacterRule}<br></br>
              -{formData.Password.MinLengthError}<br></br>
            </span>
          </div>
          
          <div className='--SecondCheckboxContainer'>
            <label><input ref={requestData.newsLetter} className='__checkbox_container' type="checkbox"/> {formData.Newsletter.FieldLabel} </label>

            <label><input required ref={requestData.terms} className='__checkbox_container' type="checkbox"/> {formData.TermsAndConditions.FieldLabel} </label>

            <label><input required ref={requestData.privacyPolicy} className='__checkbox_container' type="checkbox"/> {formData.PrivacyPolicy.FieldLabel} </label>
          </div>

          <button className='--submitButton' type='submit'>{formData.RegistrationSaveButtonLabel}</button>

          <p className='normalText'> {formData.RegistrationLoginLinkLabel} </p>
      </form>
    </div>
    </>
  );
}

export default App;
