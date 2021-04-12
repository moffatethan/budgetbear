import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Gravatar from 'react-gravatar';
import { ChevronDown } from 'react-feather';
import DropdownContent from './dropdownContent';

const Dropdown = (props) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const domRef = useRef();

  useEffect(() => {
    const handleKeyEvent = event => {
      if (event.keyCode === 27) {
        setDropdownIsOpen(false);
      }
    };
    const handleEvent = event => {
      if (domRef.current && !domRef.current.contains(event.target)) {
        setDropdownIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyEvent);
    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
      document.removeEventListener('keydown', handleKeyEvent);
    }
  }, []);

  return (
    <>
      <div ref={domRef} className="relative z-30">
        <button onClick={() => setDropdownIsOpen(!dropdownIsOpen)} className="flex items-center text-gray-600 text-med font-medium hover:text-blue-500 transition">
          <p className="flex flex-1 mr-4">
            <span className="mr-2">{authContext.authState.user.firstName} </span>
            <ChevronDown />                  
          </p>
          <Gravatar email={authContext.authState.user.emailAddress} className="rounded-full shadow-md" />
        </button>
        <DropdownContent status={dropdownIsOpen} setStatus={setDropdownIsOpen} />
      </div>
    </>
  )
}

export default Dropdown;