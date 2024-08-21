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
    skills: '',
    portfolio: '',
    linkedIn: ''
  })
  
  const [educationData, setEducationData] = useState([{
    school: '',
    fieldOfStudy: '',
    country: '',
    dateStartStudy: '',
    dateEndStudy: ''
  }])

  const [experienceData, setExperienceData] = useState([{
    companyName: '',
    positionTitle: '',
    dateFrom: '',
    dateTo: '',
    description: ''
  }])

  const [projectData, setProjectData] = useState([{
    projectName: '',
    goal: '',
    technologies: ''
  }])

  /* FUNCTION */

  const [currentSection, setCurrentSection] = useState('general');
  const [showTemplate, setShowTemplate] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotated, setIsRotated] = useState(false);

  /* FUNCTION */

  const addEducation = () => {
    const alertMsg = document.querySelector(".alertMsg");
    if(educationData.length < 5) {
      setEducationData([...educationData, { school: '', fieldOfStudy: '', country: '', dateStartStudy: '', dateEndStudy: '' }]);
    } else {
      alertMsg.textContent = "You've reached your limit of 5 educations.";

      setTimeout(() => {
        alertMsg.textContent = "";
      }, 2000);
    }
  };

  const addExperience = () => {
    const alertMsgExp = document.querySelector(".alertMsgExp");
    if(experienceData.length < 5) {
      setExperienceData([...experienceData, { companyName: '', positionTitle: '', dateFrom: '', dateTo: '', description: '' }]);
    } else {
      alertMsgExp.textContent = "You've reached your limit of 5 experiences.";

      setTimeout(() => {
        alertMsgExp.textContent = "";
      }, 2000);
    }   
  };

  const addProject = () => {
    const alertMsgPro = document.querySelector(".alertMsgPro");
    if(projectData.length < 5) {
      setProjectData([...projectData, { projectName: '', goal: '', technologies: '' }]);
    } else {
      alertMsgPro.textContent = "You've reached your limit of 5 projects.";

      setTimeout(() => {
        alertMsgPro.textContent = "";
      }, 2000);
    }  
  };

  const removeEducation = () => {
    const alertMsg = document.querySelector(".alertMsg");

    if(educationData.length > 1) {
      setEducationData((prevItems) => prevItems.slice(0, -1));

      alertMsg.textContent = "Removed education.";

      setTimeout(() => {
        alertMsg.textContent = "";
      }, 1000);
    }   
  }
  
  const removeExperience = () => {
    const alertMsgExp = document.querySelector(".alertMsgExp");

    if(experienceData.length > 1) {
      setExperienceData((prevItems) => prevItems.slice(0, -1));

      alertMsgExp.textContent = "Removed experience.";

      setTimeout(() => {
        alertMsgExp.textContent = "";
      }, 1000);
    }
  }

  const removeProject = () => {
    const alertMsgPro = document.querySelector(".alertMsgPro");

    if(projectData.length > 1) {
      setProjectData((prevItems) => prevItems.slice(0, -1));

      alertMsgPro.textContent = "Removed Project.";

      setTimeout(() => {
        alertMsgPro.textContent = "";
      }, 1000);
    }
  }

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
    } else if (currentSection === 'project') {
      console.log('Project Data submitted:', projectData);
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
    handleSectionTransition('project');
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    handleTemplate();
  };

  /* FUNCTION */

  const handlePrevious = (e) => {
    e.preventDefault();
    if(currentSection === "education") {
      handleSectionTransition("general");
    } else if(currentSection === "experience") {
      handleSectionTransition("education");
    } else {
      handleSectionTransition("experience");
    }
  }

  /* FUNCTION */
  
  const handleChangeInputs = (e, index, type) => {
    const { name, value } = e.target;
  
    if (type === 'general') {
      setGeneralData({...generalData, [name]: value});

    } else if (type === 'education') {
      const newEducationData = [...educationData];
      newEducationData[index][name] = value;
      setEducationData(newEducationData);

    } else if (type === 'experience') {
      const newExperienceData = [...experienceData];
      newExperienceData[index][name] = value;
      setExperienceData(newExperienceData);

    } else if (type === 'project') {
      const newProjectData = [...projectData];
      newProjectData[index][name] = value;
      setProjectData(newProjectData);
    }
  };

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
    const projectElement = document.getElementById('projectSection');
  
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

    if(projectElement) {
      projectElement.classList.add('section-hidden');
      projectElement.classList.remove('section-visible');
    }
  };

  /* FUNCTION */

  const sectionButtons = (event) => {
    const btn = event.target.id;
    if (window.screen.width < 800) {
      showMenu();
    }
    if(btn === "generalButton") {
      handleSectionTransition("general");
    } else if (btn === "educationButton") {
      handleSectionTransition("education");
    } else if (btn === "experienceButton") {
      handleSectionTransition("experience");
    } else if (btn === "projectButton") {
      handleSectionTransition("project");
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
    <div className={`mainApp`}>
      {!showTemplate ? (
      <>
        <div className={`menuSlideDown ${isMenuOpen ? 'open' : ''}`}>
          <SideSections sectionButtons={sectionButtons} />
          <span>CV Builder made by StarPlatinumSan using React, Vite and SCSS.</span>
          <button className={`mobileMenu ${rotated ? 'rotated' : ''}`} onClick={showMenu}></button>
        </div>
        
          <SideSections sectionButtons={sectionButtons} />
          <div className='app'>
            <section className="formSection section-visible" id="generalSection">
              <h2 className='titleSection'>General Information</h2>
              <div className="formDiv">
              <form onSubmit={handleGeneralSubmit} data-section="general">
                <div className="field fullName">

                  <div className="name field">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name='firstName' className='inputText' value={generalData.firstName} onChange={(e) => handleChangeInputs(e, null, 'general')} required />
                  </div>
                  
                  <div className="name field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name='lastName' className='inputText' value={generalData.lastName} onChange={(e) => handleChangeInputs(e, null, 'general')} required />
                  </div>

                </div>
                <div className="contactField">
                  <div className="field contact">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name='email' className='inputText' value={generalData.email} onChange={(e) => handleChangeInputs(e, null, 'general')} required />
                  </div>
                  <div className="field contact">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" className='inputText' value={generalData.phoneNumber} onChange={(e) => handleChangeInputs(e, null, 'general')} placeholder="123-456-7890" pattern="(\d{3}-?\d{3}-?\d{4})|(\d{10})" required />
                  </div>
                </div>
                
                <div className="field">
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" name='address' className='inputText' value={generalData.address} onChange={(e) => handleChangeInputs(e, null, 'general')} required />
                </div>
                <div className="field">
                  <label htmlFor="skills">Skills:</label>
                  <input type="text" id="skills" name='skills' className='inputText' value={generalData.skills} onChange={(e) => handleChangeInputs(e, null, 'general')} />
                </div>
                <div className="field">
                  <label htmlFor="portfolio">Portfolio:</label>
                  <input type="text" id="portfolio" name='portfolio' className='inputText' value={generalData.portfolio} onChange={(e) => handleChangeInputs(e, null, 'general')} />
                </div>
                <div className="field">
                  <label htmlFor="linkedIn">LinkedIn:</label>
                  <input type="text" id="linkedIn" name='linkedIn' className='inputText' value={generalData.linkedIn} onChange={(e) => handleChangeInputs(e, null, 'general')} />
                </div>
                <button type='submit' className='submitBtn buttonApp'>Submit General</button>
              </form>
              </div>
            </section>

            <section className='formSection section-hidden' id="educationSection">
              <h2 className='titleSection'>Education</h2>
              <div className="formDiv">
                <form onSubmit={handleEducationSubmit} data-section="education">
                  {educationData.map((edu, index) => (
                    <div key={index} className='contentForm'>
                      <div className='field fieldEducation'>
                        <label htmlFor={`school-${index}`}>School:</label>
                        <input type="text" id={`school-${index}`} name='school' className='inputText' value={edu.school} onChange={(e) => handleChangeInputs(e, index, 'education')} />
                      </div>
                      <div className='field fieldEducation'>
                        <label htmlFor={`fieldOfStudy-${index}`}>Field of Study:</label>
                        <input type="text" id={`fieldOfStudy-${index}`} name='fieldOfStudy' className='inputText' value={edu.fieldOfStudy} onChange={(e) => handleChangeInputs(e, index, 'education')} />
                      </div>
                      <div className='field fieldEducation'>
                        <label htmlFor={`country-${index}`}>Country:</label>
                        <input type="text" id={`country-${index}`} name='country' className='inputText' value={edu.country} onChange={(e) => handleChangeInputs(e, index, 'education')} />
                      </div>
                      <div className="studyDate">
                        <div className='field fieldEducation'>
                          <label htmlFor={`dateStartStudy-${index}`}>Date of study debut:</label>
                          <input type="date" id={`dateStartStudy-${index}`} name='dateStartStudy' className='inputDate' value={edu.dateStartStudy} onChange={(e) => handleChangeInputs(e, index, 'education')} />
                        </div>
                        <div className='field fieldEducation'>
                          <label htmlFor={`dateEndStudy-${index}`}>Date of end (or expected):</label>
                          <input type="date" id={`dateEndStudy-${index}`} name='dateEndStudy' className='inputDate' value={edu.dateEndStudy} onChange={(e) => handleChangeInputs(e, index, 'education')} />
                        </div>
                      </div>
                      <hr className='breakLine' />
                    </div>
                  ))}
                  <div className='addRemoveButtons'>
                    <button type='button' className='addBtn buttonApp' onClick={addEducation}></button>
                    <button type='button' className='removeBtn buttonApp' id="removeEdu" onClick={removeEducation}></button>
                    <span className='alertMsg'></span>
                  </div>

                  <div className='submitOrPrevious'>
                    <button type='submit' className='submitBtn buttonApp'>Submit Education</button>
                    <button type='button' className='submitBtn buttonApp previousBtn' onClick={handlePrevious}>Previous</button>
                  </div>
                </form>
              </div>
            </section>

            <section className="formSection section-hidden" id="experienceSection">
              <h2 className='titleSection'>Experience</h2>
              <div className="formDiv">
                <form onSubmit={handleExperienceSubmit} data-section="experience">
                  {experienceData.map((exp, index) => (
                    <div key={index} className='contentForm'>
                      <div className="field fieldExperience">
                        <label htmlFor={`companyName-${index}`}>Company Name:</label>
                        <input type="text" id={`companyName-${index}`} name='companyName' className='inputText' value={exp.companyName} onChange={(e) => handleChangeInputs(e, index, 'experience')} />
                      </div>
                      <div className="field fieldExperience">
                        <label htmlFor={`positionTitle-${index}`}>Position Title:</label>
                        <input type="text" id={`positionTitle-${index}`} name='positionTitle' className='inputText' value={exp.positionTitle} onChange={(e) => handleChangeInputs(e, index, 'experience')} />
                      </div>
                      <div className='experienceDate'>
                        <div className="field fieldExperience">
                          <label htmlFor={`dateFrom-${index}`}>Date From:</label>
                          <input type="date" id={`dateFrom-${index}`} name='dateFrom' className='inputDate' value={exp.dateFrom} onChange={(e) => handleChangeInputs(e, index, 'experience')} />
                        </div>
                        <div className="field fieldExperience">
                          <label htmlFor={`dateTo-${index}`}>Date To:</label>
                          <input type="date" id={`dateTo-${index}`} name='dateTo' className='inputDate' value={exp.dateTo} onChange={(e) => handleChangeInputs(e, index, 'experience')} />
                        </div>
                      </div>
                      <div className="field fieldExperience">
                        <label htmlFor={`description-${index}`}>Description:</label>
                        <textarea id={`description-${index}`} name='description' className='inputTextArea' value={exp.description} onChange={(e) => handleChangeInputs(e, index, 'experience')}></textarea>
                      </div>
                      <hr className='breakLine' />
                    </div>
                  ))}
                  <div className='addRemoveButtons'>
                    <button type='button' className='addBtn buttonApp' onClick={addExperience}></button>
                    <button type='button' className='removeBtn buttonApp' id="removeExp" onClick={removeExperience}></button>
                    <span className='alertMsgExp'></span>
                  </div>
                  
                  <div className='submitOrPrevious'>
                    <button type='submit' className='submitBtn buttonApp'>Submit Experience</button>
                    <button type='button' className='submitBtn buttonApp previousBtn' onClick={handlePrevious}>Previous</button>
                  </div>
                </form>
              </div>
            </section>

            <section className="formSection section-hidden" id="projectSection">
              <h2 className='titleSection'>Projects</h2>
              <div className="formDiv">
                <form onSubmit={handleProjectSubmit} data-section="project">
                  {projectData.map((pro, index) => (
                    <div key={index} className='contentForm'>
                      <div className="field fieldProject">
                        <label htmlFor={`projectName-${index}`}>Project Name:</label>
                        <input type="text" id={`projectName-${index}`} name='projectName' className='inputText' value={pro.projectName} onChange={(e) => handleChangeInputs(e, index, 'project')} />
                      </div>
                      <div className="field fieldProject">
                        <label htmlFor={`goal-${index}`}>Goal:</label>
                        <textarea id={`goal-${index}`} name='goal' className='inputTextArea goalTextArea' value={pro.goal} onChange={(e) => handleChangeInputs(e, index, 'project')}></textarea>
                      </div>
                      <div className="field fieldProject">
                        <label htmlFor={`technologies-${index}`}>Technologies used:</label>
                        <input type="text" id={`technologies-${index}`} name='technologies' className='inputText' value={pro.technologies} onChange={(e) => handleChangeInputs(e, index, 'project')} />
                      </div>
                      <hr className='breakLine' />
                    </div>
                  ))}
                  <div className='addRemoveButtons'>
                    <button type='button' className='addBtn buttonApp' onClick={addProject}></button>
                    <button type='button' className='removeBtn buttonApp' id="removePro" onClick={removeProject}></button>
                    <span className='alertMsgPro'></span>
                  </div>
                  
                  <div className='submitOrPrevious'>
                    <button type='submit' className='submitBtn buttonApp submitGenerate'>Submit and generate resume</button>
                    <button type='button' className='submitBtn buttonApp previousBtn' onClick={handlePrevious}>Previous</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
          </> 
        ) : (
          <div className='templateContainer'>
            <Template
            generalData={generalData}
            educationData={educationData}
            experienceData={experienceData}
            projectData={projectData}
            />
            <button type='button' className='buttonApp editButton' onClick={() => undoTemplate()}>Edit infos</button>
          </div>
          )}
    </div>
  );
}


