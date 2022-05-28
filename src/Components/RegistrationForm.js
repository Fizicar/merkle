import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios';
import jsonData from '../json-server/db.json';


export default function RegistrationForm() {

  /// Temporary JSON fix, server was buggy
  const newJsonData = jsonData
  const JsonFormData = newJsonData.registrationLabels
  console.log(newJsonData)

  const [isLoading, setLoading] = useState(true);
  const [formData, getFormLabels] = useState(null)

  useEffect(() => {
    getFormData()
    setLoading(false);
  }, [])

  const getFormData = () => {
    axios.get("http://localhost:3000/registrationLabels")
        .then(response => {
          getFormLabels(response.data)
          
          console.log(response)
        })
        .catch(error => console.error('Error: ' . error))

  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    
    <div className='registrationForm'>
        <div className='--title'>
            {JsonFormData.RegistrationTitle}
        </div>

        <div className='--introduction'>
            {JsonFormData.RegistrationIntroductionText}
        </div>

        <div className='--firstCheckboxContainer'>

          {JsonFormData.SalutationSource.map((value, index) => {
            return <label><input className='__checkbox_container' /> {value.Name} </label>
          })}
          
        </div>

        <div className='--inputContainer'>
          <input className='__input' type="text"  placeholder={JsonFormData.FirstName.FieldLabel} { ...JsonFormData.FirstName.IsRequired && "required"}/>
        </div>

        <div className='--inputContainer'>
        <input className='__input' type="text"  placeholder={JsonFormData.LastName.FieldLabel} { ...JsonFormData.LastName.IsRequired && "required"}/>
        </div>

        <div className='--inputContainer'>
        <input className='__input' type="text"  placeholder={JsonFormData.Email.FieldLabel} { ...JsonFormData.Email.IsRequired && "required"}/>
        </div>

        <div className='--inputContainer'>
        <input className='__input' type="text"  placeholder={JsonFormData.Password.FieldLabel} { ...JsonFormData.Password.IsRequired && "required"}/>
          <span className='__passwordInstructions'>
            -{JsonFormData.Password.LetterRule}<br></br>
            -{JsonFormData.Password.NumberRule}<br></br>
            -{JsonFormData.Password.SpecialCharacterRule}<br></br>
            -{JsonFormData.Password.MinLengthError}<br></br>
          </span>
        </div>
        
        <div className='--SecondCheckboxContainer'>
          <label><input className='__checkbox_container' /> {JsonFormData.Password.Newsletter.FieldLabel} </label>

          <label><input className='__checkbox_container' /> {JsonFormData.Password.TermsAndConditions.FieldLabel} </label>

          <label><input className='__checkbox_container' /> {JsonFormData.Password.PrivacyPolicy.FieldLabel} </label>
        </div>

        <button className='submit' type='submit'>Konto Erstellen</button>

        <p className='normalText'> </p>
    </div>
    
  )
}
