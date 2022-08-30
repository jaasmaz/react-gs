import React, { useMemo } from 'react';

export default (props: any) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );
  console.log(data);

  return (
    <div
      className='custom-tooltip'
      style={{ backgroundColor: props.color || 'white', width: 'fit-content' }}
    >
      <p>
        <span>{data.name}</span>
      </p>
      <p>
        <span>Email: </span> {data.email}
      </p>
      <p>
        <span>Status: </span> {data.status}
      </p>
    </div>
  );
};
