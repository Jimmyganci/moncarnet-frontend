import React from 'react';
import { Link } from 'react-router-dom';

import IProsLinks from '../../../Interfaces/IProsLinks';

type Props = IProsLinks;

const SideLinkAdmin: React.FC<Props> = (props) => {
  return (
    <div className="w-full h-1/6 ">
      <li className="flex items-center h-full">
        <div className="flex justify-center w-1/3">
          <img className="" src={props.logo} alt={props.alt} />
        </div>
        <div className="flex justify-start w-2/3">
          <Link className="hover:text-white" to={props.path}>
            {props.label}
          </Link>
        </div>
      </li>
    </div>
  );
};

export default SideLinkAdmin;
