import { useState } from "react";

function Hint(props) {

  const [showHint, setShowHint] = useState(false);

  return (
    <div className="hint">
      <img onClick={() => setShowHint(prev => prev ? false : true)} src="./assets/images/hint_icon.svg"></img>
      <div className={`hint__blank ${showHint ? "" : "hint-hidden"}`}>
        {props.word.split(" ").map((word, index) => (
          <div key={index} className="blank-word">
          {word.split("").map((letter, index) => (
            <div className="blank-section" key={index}>
              {/* <span className="blank-letter">{letter}</span> */}
              {letter === " " ? < div className="space"></div> : <div className="blank-underline"></div>}
            </div>
          ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hint;