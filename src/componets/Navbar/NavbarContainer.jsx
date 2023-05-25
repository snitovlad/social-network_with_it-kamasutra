import { connect } from 'react-redux';
import Friends from './Friends/Friends';
import Navbar from './Navbar';


let mapStateToProps = (state) => {
   return {
      friendsPerson: state.sidebar.friends.map(fri => <Friends key={fri.id} id={fri.id} name={fri.name} />)
   }
}    

const NavbarContainer = connect(mapStateToProps)(Navbar)

export default NavbarContainer;