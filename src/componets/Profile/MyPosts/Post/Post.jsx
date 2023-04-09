import s from './Post.module.css'

function Post(props) {
   return (
      
            <div className={s.item}>
               <img src={props.avatar} />
               {props.message}
               <div>
                  <span>{props.like}</span>
               </div>
            </div>
            
   );
}

export default Post;