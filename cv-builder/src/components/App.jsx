import { useState } from 'react'
import Template from './Template';

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
    titleOfStudy: '',
    dateEndStudy:''
  })

  const [experienceData, setExperienceData] = useState({
    companyName: '',
    positionTitle: '',
    dateFrom: '',
    dateTo: '',
    description: ''
  })

  const [currentSection, setCurrentSection] = useState('general');

  const [showTemplate, setShowTemplate] = useState(false);

  const handleSectionTransition = (nextSection) => {
    const currentElement = document.getElementById(`${currentSection}Section`);
    const nextElement = document.getElementById(`${nextSection}Section`);

    currentElement.classList.remove('section-visible');

    currentElement.classList.add('section-hidden');
    nextElement.classList.remove('section-hidden');
    nextElement.classList.add('section-visible');
    setCurrentSection(nextSection);
  };

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    handleSectionTransition('education');
    console.log('General Data submitted:', generalData);
  };

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    handleSectionTransition('experience');
    console.log('Education Data submitted:', educationData);
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    handleTemplate();
    console.log('Experience Data submitted:', experienceData);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if(currentSection === "education") {
      handleSectionTransition("general");
    } else {
      handleSectionTransition("education");
    }
      
  }
  
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

  const handleTemplate = () => {
    const currentElement = document.getElementById(`${currentSection}Section`);
    currentElement.classList.remove('section-visible');
    currentElement.classList.add('section-hidden');
    setShowTemplate(true);
  }


  /* FUNCTION */

  return (
    <div className='app'>
      {!showTemplate ? (
        <> 
        <section className="general section-visible" id="generalSection">
          <h2 className='titleSection'>General Information</h2>
          <form onSubmit={handleGeneralSubmit} data-section="general">
            <div className="field fullName">

              <div className="name field">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name='firstName' className='inputText' value={generalData.firstName} onChange={handleChange} /* required */ />
              </div>
              
              <div className="name field">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name='lastName' className='inputText' value={generalData.lastName} onChange={handleChange} /* required */ />
              </div>

            </div>
            <div className="field contact">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name='email' className='inputText' value={generalData.email} onChange={handleChange} /* required */ />
            </div>
            <div className="field contact">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input type="text" id="phoneNumber" name="phoneNumber" className='inputText' value={generalData.phoneNumber} onChange={handleChange} placeholder="123-456-7890" /* required */ />
            </div>
            <div className="field">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name='address' className='inputText' value={generalData.address} onChange={handleChange} /* required */ />
            </div>
            <div className="field">
              <label htmlFor="portfolio">Portfolio:</label>
              <input type="text" id="portfolio" name='portfolio' className='inputText' value={generalData.portfolio} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="linkedIn">LinkedIn:</label>
              <input type="text" id="linkedIn" name='linkedIn' className='inputText' value={generalData.linkedIn} onChange={handleChange} />
            </div>
            <button type='submit' className='submitBtn'>Submit General</button>
          </form>
        </section>

        <section className='education section-hidden' id="educationSection">
        <h2 className='titleSection'>Education</h2>
          <form onSubmit={handleEducationSubmit} data-section="education">
            <div className='field fieldEducation'>
              <label htmlFor="school">School:</label>
              <input type="text" id="school" name='school' className='inputText' value={educationData.school} onChange={handleChange} />
            </div>
            <div className='field fieldEducation'>
              <label htmlFor="titleOfStudy">Title of Study:</label>
              <input type="text" id="titleOfStudy" name='titleOfStudy' className='inputText' value={educationData.titleOfStudy} onChange={handleChange} />
            </div>
            <div className='field fieldEducation'>
              <label htmlFor="dateEndStudy">Date End of Study:</label>
              <input type="date" id="dateEndStudy" name='dateEndStudy' className='inputDate' value={educationData.dateEndStudy} onChange={handleChange} />
            </div>
            <div className='submitOrPrevious'>
              <button type='submit' className='submitBtn'>Submit Education</button>
              <button type='button' className='submitBtn previousBtn' onClick={handlePrevious}>Previous</button>
            </div>
          </form>      
        </section>

        <section className="experience section-hidden" id="experienceSection">
        <h2 className='titleSection'>Experience</h2>
          <form onSubmit={handleExperienceSubmit} data-section="experience">
            <div className="field fieldExperience">
              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" name='companyName' className='inputText' value={experienceData.companyName} onChange={handleChange} />
            </div>
            <div className="field fieldExperience">
              <label htmlFor="dateFrom">Date From:</label>
              <input type="date" id="dateFrom" name='dateFrom' className='inputDate' value={experienceData.dateFrom} onChange={handleChange} />
            </div>
            <div className="field fieldExperience">
              <label htmlFor="dateTo">Date To:</label>
              <input type="date" id="dateTo" name='dateTo' className='inputDate' value={experienceData.dateTo} onChange={handleChange} />
            </div>
            <div className="field fieldExperience">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name='description' className='inputTextArea' value={experienceData.description} onChange={handleChange}></textarea>
            </div>
            <div className='submitOrPrevious'>
              <button type='submit' className='submitBtn submitGenerate'>Submit and generate resume</button>
              <button type='button' className='submitBtn previousBtn' onClick={handlePrevious}>Previous</button>
            </div>
          </form>
        </section>
        </> 
      ) : (
          <Template
          generalData={generalData}
          educationData={educationData}
          experienceData={experienceData}
          />
        )}
    </div>
  );
}


