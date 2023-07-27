import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='text-center'>
        <Spinner className='' animation='border' role="status"></Spinner>
    </div>
  )
}

export default Loading