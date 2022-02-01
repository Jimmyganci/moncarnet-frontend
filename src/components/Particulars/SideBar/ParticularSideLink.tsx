import React from 'react';
import { Link } from 'react-router-dom';
import IProsLinks from '../../../Interfaces/IProsLinks';

type Props = IProsLinks;

const ParticularSideLink: React.FC<Props> = (props) => {
  return (
    <div className="w-full h-1/6 mb-2 ml-4">
      <li className="h-full flex items-center">
        <div className="w-1/3 flex justify-center">
          <img className="" src={props.logo} alt={props.alt} />
        </div>
        <div className="w-2/3 flex justify-start">
          <Link className="hover:text-white" to={props.path}>
            {props.label}
          </Link>
        </div>
      </li>
    </div>
  );
};

export default ParticularSideLink;
