import React from 'react';

export interface IfProps {
  condition: boolean;
  elseRender?: any;
}

const If: React.FC<IfProps> = ({ children, condition, elseRender = null }) => {
  return <>{condition ? children : elseRender}</>;
};

export default If;
