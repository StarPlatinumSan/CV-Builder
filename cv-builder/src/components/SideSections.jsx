export default function SideSections({sectionButtons = {}}) {
    return (
        <> 
        <div className="menu">
              <h2 className="menuTitle">Sections</h2>
              <button className="buttonMenu" id='generalButton' onClick={sectionButtons}>📝 General </button>
              <button className="buttonMenu" id='educationButton' onClick={sectionButtons}>🎓 Education </button>
              <button className="buttonMenu" id='experienceButton' onClick={sectionButtons}>⚒️ Experience </button>
              <button className="buttonMenu" id='projectButton' onClick={sectionButtons}>🎭 Projects </button>
              <button className="buttonMenu buttonTemplateMenu" id='templateButton' onClick={sectionButtons}>📃 Render Resume </button>
          </div>
        </>
    )
}