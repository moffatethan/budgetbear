import React, { useEffect, useRef, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import PropError from '../../errors/PropError'
import { useTransition, animated } from 'react-spring';
import { ArrowLeft } from 'react-feather';
import { easeQuadIn, easeQuadOut } from 'd3-ease';
const formDrawerElement = document.getElementById('formDrawer');

/**
 * Slide out navigation drawer. 
 * @param {boolean} status The status of the formDrawer.
 * @param {Function} setStatus A setter function to handle state.
 * @param {} children The content to display in the drawer. 
 * @returns 
 */
 const FormDrawer = ({ status, setStatus, children }) => {
	if (!status || !setStatus) {
		throw new PropError('Properties `status` and `setStatus` are required on FormDrawer');
	}

	useEffect(() => {
		formDrawerElement.classList.add('fixed', 'inset-0', 'bg-gray-500', 'z-40', 'bg-opacity-75', 'h-full');
		const handleEvent = event => {
      if (event.target.contains(formDrawerElement)) {
        setStatus(false);
      }
    }
		const handleKeyEvent = event => {
			if (event.keyCode === 27) {
				setStatus(false);
			}
		}
    document.addEventListener('mousedown', handleEvent);
		document.addEventListener('keydown', handleKeyEvent);
    return () => {
			formDrawerElement.classList.remove('fixed', 'inset-0', 'bg-gray-500', 'z-40', 'bg-opacity-75', 'h-full');
      document.removeEventListener('mousedown', handleEvent);
			document.removeEventListener('keydown', handleKeyEvent);
    }
	}, [])

	return status 
	? createPortal(
		cloneElement(children, { status, setStatus }), 
		formDrawerElement
	)
	: null
}

/**
 * Slide drawer page for content to be added into.
 * @param {} children Content to render within the page.
 * @returns 
 */
export const FormDrawerPage = ({ status, setStatus, children }) => {
	const transitions = useTransition(status, null, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translate(100%)' },
    config: (item, state) => ({
      easing: state === "leave" ? easeQuadIn : easeQuadOut,
      duration: state === "leave" ? 350 : 350,
    }),
  });
	return transitions.map(
		({item, key, props}) =>
			item && (
				<animated.div
					style={props}
					key={key}
				>
					<div className="shadow-lg absolute inset-y-0 right-0 w-5/12 bg-white z-50 h-screen opacity-100">
						<a onClick={() => setStatus(false)} className="flex mb-5 m-auto lg:w-11/12 md:w-11/12 cursor-pointer text-gray-400 pt-6 transition hover:text-gray-500">
							{/* closing data */}
							<ArrowLeft />
							<span className="ml-2">Back</span>
						</a>
						{children}
					</div>
				</animated.div>
			)
	)
}

/**
 * The context of the form drawer side action.
 * @param {Object} props Provide a heading and paragraph property.
 * @returns 
 */
export const FormDrawerPageHeader = ({ heading, paragraph }) => (
  <div class="pt-3 mb-5 lg:w-11/12 md:w-11/12 m-auto">
    <div>
      <h2 className="text-4xl font-medium text-blue-500">{heading}</h2>
      <p className="mt-3 text-lg text-gray-600 leading-loose">{paragraph}</p>
    </div>
  </div>
)

export default FormDrawer
