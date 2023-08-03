import React from 'react';
import { Alert } from 'react-bootstrap';

const MsgBox = ({children, variant}) => {
  return (
    <Alert className={variant || "info"} >{children}</Alert>
  )
}

export default MsgBox;