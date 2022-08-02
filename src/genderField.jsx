export default (props) => {
  const value = props.value;
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={
          value === 'male'
            ? 'https://cdn-icons-png.flaticon.com/512/64/64096.png'
            : 'https://cdn-icons-png.flaticon.com/512/65/65581.png'
        }
        style={{ width: '25px' }}
        alt={value}
      ></img>
    </div>
  );
};
