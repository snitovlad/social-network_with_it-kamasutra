import s from './Post.module.css'

function Post() {
   return (
      
            <div className={s.item}>
               <img src="https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg" />
               post1
               <div>
                  <span>like</span>
               </div>
            </div>
            
   );
}

export default Post;