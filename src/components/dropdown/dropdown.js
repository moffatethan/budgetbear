import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Gravatar from 'react-gravatar';
import { ChevronDown } from 'react-feather';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { easeQuadIn, easeQuadOut } from 'd3-ease';

const Dropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const transitions = useTransition(dropdownOpen, null, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: (item, state) => ({
      easing: state === "leave" ? easeQuadIn : easeQuadOut,
      duration: state === "leave" ? 75 : 100,
    }),
  });

  const menuRef = useRef();

  useEffect(() => {
    const handler = event => {
      if (!menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, []);

  return (
    <>
      <div ref={menuRef} className="relative z-50">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center text-gray-600 text-med font-medium hover:text-blue-500 transition">
          <p className="flex flex-1 mr-4">
            <span className="mr-2">{authContext.authState.user.firstName} </span>
            <ChevronDown />                  
          </p>
          <Gravatar email={authContext.authState.user.emailAddress} className="rounded-full shadow-md" />
        </button>
        {
          dropdownOpen
          ? transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  style={props}
                  key={key}
                >
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl">
                    <ul className="divide-solid divide-gray-100 divide-y-2">
                      <div className="pl-5 pt-5 pr-5 pb-3">
                        <li className="py-2">
                          <Link onClick={() => setDropdownOpen(!dropdownOpen)} to="/dashboard" className="transition-colors text-gray-800 hover:text-blue-500">Dashboard</Link>
                        </li>
                        <li className="py-2">
                          <Link onClick={() => setDropdownOpen(!dropdownOpen)} to="/account/settings" className="transition-colors text-gray-800 hover:text-blue-500">Account Settings</Link>
                        </li>
                      </div>
                      <div className="pl-5 pt-2 pr-5 pb-3">
                        <li className="py-2">
                          <button onClick={authContext.logout} className="transition-colors text-gray-800 hover:text-blue-500" href="#">Logout</button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </animated.div>
              )
          )
          : null
        }
      </div>
    </>
  )
}

export default Dropdown;