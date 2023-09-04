import { useLocation, useNavigate, useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';

/*export function withRouter(Component) {  //добавили вместо withRouter т.к. в 2023 уже не работает
   return (props) => {
      const match = {params: useParams()};
      return <Component {...props} match={match} />
   }
}*/

 export function withRouter(Component) {  //добавили вместо withRouter т.к. в 2023 уже не работает. Общий случай
      function ComponentWithRouterProp(props) {
         let location = useLocation();
         let navigate = useNavigate();
         let params = useParams();        

         return ( 
            <Component {...props} router={{location, navigate, params}} />
         )
      }
         return ComponentWithRouterProp;
   }
 //  export default connect( mapStateToProps, {setUserProfile} )(ComponentWithRouterProp(ProfileContainer)); 