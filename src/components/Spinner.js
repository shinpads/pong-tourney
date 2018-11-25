import React from 'react';

const Spinner = ({
  loading=true,
}) => {
  if (loading) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    );
  } else {
    return <div />
  }
}

export default Spinner;
