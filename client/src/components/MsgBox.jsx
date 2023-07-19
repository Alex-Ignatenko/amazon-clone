import React from 'react';
import { Alert } from 'react-bootstrap';

const MsgBox = ({children, variant}) => {
  return (
    <Alert variant={variant || "info"}>{children}</Alert>
  )
}

export default MsgBox;