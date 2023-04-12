import s from './Post.module.css'

function Post(props) {
   return (
      <div className={s.item}>
         <img src={props.avatar} />
         {props.message}
         <div>
            <span>like:  </span>{props.likeCount}
         </div>
      </div>
   );
}

export default Post;