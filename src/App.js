import './App.css';
import './Styles/RegistrationForm.css'
import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios';
import jsonData from './json-server/db.json';

function App() {  
  const [isLoading, setLoading] = useState(true);
  const [formData, getFormLabels] = useState(null)

  useEffect(() => {
    getFormData()
    
  }, [])

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

  function sendFormData(){
    alert("we are sendon the data")
  }

  return (
    <>
    <div className="App">
      <div className='registrationForm'>
          <div className='--title'>
              {formData.RegistrationTitle}
          </div>

          <div className='--introduction'>
              {formData.RegistrationIntroductionText}
          </div>

          <div className='--firstCheckboxContainer'>

            {formData.SalutationSource.map((value, index) => {
              return <label><input name="action" className='__checkbox_container' type="radio"/> {value.Name} </label>
            })}
            
          </div>

          <div className='--inputContainer'>
            <input className='__input' type="text"  placeholder={formData.FirstName.FieldLabel} { ...formData.FirstName.IsRequired && "required"}/>
          </div>

          <div className='--inputContainer'>
          <input className='__input' type="text"  placeholder={formData.LastName.FieldLabel} { ...formData.LastName.IsRequired && "required"}/>
          </div>

          <div className='--inputContainer'>
          <input className='__input' type="text"  placeholder={formData.Email.FieldLabel} { ...formData.Email.IsRequired && "required"}/>
          </div>

          <div className='--inputContainer'>
          <input className='__input' type="text"  placeholder={formData.Password.FieldLabel} { ...formData.Password.IsRequired && "required"}/>
            <span className='__passwordInstructions'>
              -{formData.Password.LetterRule}<br></br>
              -{formData.Password.NumberRule}<br></br>
              -{formData.Password.SpecialCharacterRule}<br></br>
              -{formData.Password.MinLengthError}<br></br>
            </span>
          </div>
          
          <div className='--SecondCheckboxContainer'>
            <label><input className='__checkbox_container' type="checkbox"/> {formData.Newsletter.FieldLabel} </label>

            <label><input className='__checkbox_container' type="checkbox"/> {formData.TermsAndConditions.FieldLabel} </label>

            <label><input className='__checkbox_container' type="checkbox"/> {formData.PrivacyPolicy.FieldLabel} </label>
          </div>

          <button onClick={sendFormData} className='--submitButton' type='submit'>{formData.RegistrationSaveButtonLabel}</button>

          <p className='normalText'> {formData.RegistrationLoginLinkLabel} </p>
      </div>
    </div>
    </>
  );
}

export default App;
