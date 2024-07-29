import { useState } from 'react'
import Template from './Template';
import SideSections from './SideSections';

export default function App() {
  const [generalData, setGeneralData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    portfolio: '',
    linkedIn: ''
  })
  
  const [educationData, setEducationData] = useState({
    school: '',
    fieldOfStudy: '',
    country: '',
    dateStartStudy: '',
    dateEndStudy: ''
  })

  const [experienceData, setExperienceData] = useState({
    companyName: '',
    positionTitle: '',
    dateFrom: '',
    dateTo: '',
    description: ''
  })

  /* FUNCTION */

  const [currentSection, setCurrentSection] = useState('general');
  const [showTemplate, setShowTemplate] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotated, setIsRotated] = useState(false);

  /* FUNCTION */

  const handleSectionTransition = (nextSection) => {
    handleCurrentFormSubmission();
    const currentElement = document.getElementById(`${currentSection}Section`);
    const nextElement = document.getElementById(`${nextSection}Section`);
  
    if (currentElement) {
      currentElement.classList.add('section-hidden');
      currentElement.classList.remove('section-visible');
    }
  
    if (nextElement) {
      nextElement.classList.remove('section-hidden');
      nextElement.classList.add('section-visible');
    }
  
    setCurrentSection(nextSection);
  };

  /* FUNCTION */

  const handleCurrentFormSubmission = () => {
    if (currentSection === 'general') {
      console.log('General Data submitted:', generalData);
    } else if (currentSection === 'education') {
      console.log('Education Data submitted:', educationData);
    } else if (currentSection === 'experience') {
      console.log('Experience Data submitted:', experienceData);
    }
  };

  /* FUNCTION */

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    handleSectionTransition('education');
  };

  /* FUNCTION */

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    handleSectionTransition('experience');
  };

  /* FUNCTION */

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    handleTemplate();
  };

  /* FUNCTION */

  const handlePrevious = (e) => {
    e.preventDefault();
    if(currentSection === "education") {
      handleSectionTransition("general");
    } else {
      handleSectionTransition("education");
    }     
  }

  /* FUNCTION */
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    const section = e.target.closest('form').dataset.section;
  
    if (section === 'general') {
      setGeneralData({
        ...generalData,
        [name]: value
      })
    } else if (section === 'education') {
      setEducationData({
        ...educationData,
        [name]: value
      })
    } else if(section === 'experience') {
      setExperienceData({
        ...experienceData,
        [name]: value
      })
    }
  }

  /* FUNCTION */

  const handleTemplate = () => {
    handleCurrentFormSubmission();
    setShowTemplate(true);
  }

  /* FUNCTION */

  const undoTemplate = () => {
    setShowTemplate(false);
    setCurrentSection('general');
    const generalElement = document.getElementById('generalSection');
    const educationElement = document.getElementById('educationSection');
    const experienceElement = document.getElementById('experienceSection');
  
    if (generalElement) {
      generalElement.classList.add('section-visible');
      generalElement.classList.remove('section-hidden');
    }
  
    if (educationElement) {
      educationElement.classList.add('section-hidden');
      educationElement.classList.remove('section-visible');
    }
  
    if (experienceElement) {
      experienceElement.classList.add('section-hidden');
      experienceElement.classList.remove('section-visible');
    }
  };

  /* FUNCTION */

  const sectionButtons = (event) => {
    const btn = event.target.id;
    if(btn === "generalButton") {
      handleSectionTransition("general");
    } else if (btn === "educationButton") {
      handleSectionTransition("education");
    } else if (btn === "experienceButton") {
      handleSectionTransition("experience");
    } else {
      handleTemplate();
    }
  }

  const showMenu = () => {
    setIsMenuOpen(prevState => !prevState);
    setIsRotated(prevState => !prevState);
  };


  /* FUNCTION */

  return (
    <div className="mainApp">
      {!showTemplate ? (
      <>
        <div className={`menuSlideDown ${isMenuOpen ? 'open' : ''}`}>
          <button className={`mobileMenu ${rotated ? 'rotated' : ''}`} onClick={showMenu}></button>
        </div>
        
          <SideSections sectionButtons={sectionButtons} />
          <div className='app'>
            <section className="formSection section-visible" id="generalSection">
              <h2 className='titleSection'>General Information</h2>
              <form onSubmit={handleGeneralSubmit} data-section="general">
                <div className="field fullName">

                  <div className="name field">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name='firstName' className='inputText' value={generalData.firstName} onChange={handleChange} required />
                  </div>
                  
                  <div className="name field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name='lastName' className='inputText' value={generalData.lastName} onChange={handleChange} required />
                  </div>

                </div>
                <div className="contactField">
                  <div className="field contact">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name='email' className='inputText' value={generalData.email} onChange={handleChange} required />
                  </div>
                  <div className="field contact">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" className='inputText' value={generalData.phoneNumber} onChange={handleChange} placeholder="123-456-7890" required />
                  </div>
                </div>
                
                <div className="field">
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" name='address' className='inputText' value={generalData.address} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="portfolio">Portfolio:</label>
                  <input type="text" id="portfolio" name='portfolio' className='inputText' value={generalData.portfolio} onChange={handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="linkedIn">LinkedIn:</label>
                  <input type="text" id="linkedIn" name='linkedIn' className='inputText' value={generalData.linkedIn} onChange={handleChange} />
                </div>
                <button type='submit' className='submitBtn buttonApp'>Submit General</button>
              </form>
            </section>

            <section className='formSection section-hidden' id="educationSection">
            <h2 className='titleSection'>Education</h2>
              <form onSubmit={handleEducationSubmit} data-section="education">
                <div className='field fieldEducation'>
                  <label htmlFor="school">School:</label>
                  <input type="text" id="school" name='school' className='inputText' value={educationData.school} onChange={handleChange} />
                </div>
                <div className='field fieldEducation'>
                  <label htmlFor="fieldOfStudy">Field of Study:</label>
                  <input type="text" id="fieldOfStudy" name='fieldOfStudy' className='inputText' value={educationData.fieldOfStudy} onChange={handleChange} />
                </div>
                <div className='field fieldEducation'>
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" name='country' className='inputText' value={educationData.country} onChange={handleChange} />
                </div>
                <div className="studyDate">
                  <div className='field fieldEducation'>
                    <label htmlFor="dateStartStudy">Date of study debut:</label>
                    <input type="date" id="dateStartStudy" name='dateStartStudy' className='inputDate' value={educationData.dateStartStudy} onChange={handleChange} />
                  </div>
                  <div className='field fieldEducation'>
                    <label htmlFor="dateStartStudy">Date of end (or expected):</label>
                    <input type="date" id="dateStartStudy" name='dateStartStudy' className='inputDate' value={educationData.dateStartStudy} onChange={handleChange} />
                  </div>
                </div>
                <div className='submitOrPrevious'>
                  <button type='submit' className='submitBtn buttonApp'>Submit Education</button>
                  <button type='button' className='submitBtn buttonApp previousBtn' onClick={handlePrevious}>Previous</button>
                </div>
              </form>      
            </section>

            <section className="formSection section-hidden" id="experienceSection">
            <h2 className='titleSection'>Experience</h2>
              <form onSubmit={handleExperienceSubmit} data-section="experience">
                <div className="field fieldExperience">
                  <label htmlFor="companyName">Company Name:</label>
                  <input type="text" id="companyName" name='companyName' className='inputText' value={experienceData.companyName} onChange={handleChange} />
                </div>
                <div className='experienceDate'>
                  <div className="field fieldExperience">
                    <label htmlFor="dateFrom">Date From:</label>
                    <input type="date" id="dateFrom" name='dateFrom' className='inputDate' value={experienceData.dateFrom} onChange={handleChange} />
                  </div>
                  <div className="field fieldExperience">
                    <label htmlFor="dateTo">Date To:</label>
                    <input type="date" id="dateTo" name='dateTo' className='inputDate' value={experienceData.dateTo} onChange={handleChange} />
                  </div>
                </div>
                <div className="field fieldExperience">
                  <label htmlFor="description">Description:</label>
                  <textarea id="description" name='description' className='inputTextArea' value={experienceData.description} onChange={handleChange}></textarea>
                </div>
                <div className='submitOrPrevious'>
                  <button type='submit' className='submitBtn buttonApp submitGenerate'>Submit and generate resume</button>
                  <button type='button' className='submitBtn buttonApp previousBtn' onClick={handlePrevious}>Previous</button>
                </div>
              </form>
            </section>
            </div>
          </> 
        ) : (
          <div className='templateContainer'>
            <Template
            generalData={generalData}
            educationData={educationData}
            experienceData={experienceData}
            />
            <button type='button' className='buttonApp editButton' onClick={() => undoTemplate()}>Edit infos</button>
          </div>
          )}
    </div>
  );
}


