import { setFilter } from '../slices/filterSlice';
import { connect } from 'react-redux';

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={({ target }) => props.setFilter(target.value)} />
    </div>
  );
};

const mapDispatchToProps = { setFilter };

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
