import React from 'react';
import { Alert } from 'react-bootstrap';

export const MsgBox = ({children, variant}) => {
  return (
    <Alert variant={variant || "info"}>{children}</Alert>
  )
}
