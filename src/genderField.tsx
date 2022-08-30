export default (props: any) => {
  const value = props.value;
  const rowIndex = props.rowIndex;
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={
          value === 'male'
            ? 'https://cdn-icons-png.flaticon.com/512/64/64096.png'
            : 'https://cdn-icons-png.flaticon.com/512/65/65581.png'
        }
        style={{
          width: '25px',
          borderRadius: '3px',
          background: rowIndex % 2 ? '#ffefef' : '#ffcccc',
        }}
        alt={value}
      ></img>
    </div>
  );
};
