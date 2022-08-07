import React, { Fragment } from 'react'

const SmallLoader = ({style}) => {
  return (
    <Fragment>
      <span className="spinner-border spinner-border-sm" style={style} role="status" aria-hidden="true"></span>
    </Fragment>
  )
}

SmallLoader.defaultProps = {
  style:{
    width: "1rem",
    height: "1rem"
  }
}

export default SmallLoader