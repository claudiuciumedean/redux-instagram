import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreator';
import Wrapper from './Wrapper';

const mapStateToProps = (state) => ({ posts: state.posts, comments: state.comments});

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(Wrapper);
 
export default App;