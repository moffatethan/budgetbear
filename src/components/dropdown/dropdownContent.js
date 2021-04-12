import React, { useContext, forwardRef } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useTransition, animated } from 'react-spring';
import { easeQuadIn, easeQuadOut } from 'd3-ease';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
import PropError from '../../errors/PropError';

const DropdownContent = ({ status, setStatus }) => {
  if (status === undefined || setStatus === undefined) {
    throw new PropError('Properties `status` and `setStatus` are required for DropdownContent component');
  }
  
  const authContext = useContext(AuthContext);
  const transitions = useTransition(status, null, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: (item, state) => ({
      easing: state === "leave" ? easeQuadIn : easeQuadOut,
      duration: state === "leave" ? 75 : 100,
    }),
  });

  return (
    <div>
      {transitions.map(
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
                        <Link onClick={() => setStatus(false)} to="/dashboard" className="transition-colors text-gray-800 hover:text-blue-500">Dashboard</Link>
                      </li>
                      <li className="py-2">
                        <Link onClick={() => setStatus(false)} to="/account/settings" className="transition-colors text-gray-800 hover:text-blue-500">Account Settings</Link>
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
      }
    </div>
  )
};

export default DropdownContent;
