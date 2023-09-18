import profileReducer, { addPost, deletePost } from './profile-reducer';

let state = {
   posts: [
      { id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg' },
      { id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg' },
      { id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1' }
   ]
}

test('new post should be added', () => {

   //1.test data (готовим исходные данные)
   let action = addPost("it-kamasutra.com");

   //2.action (коллбэк, к-рый является непосредственно тестом)
   let newState = profileReducer(state, action);

   //3.expectation (ожидаем (expect), что наше значение (newState.posts.length) будет равно (toBe) четырем (4))
   expect(newState.posts.length).toBe(4)
});

test('message of new post should be correct', () => {
   //1.test data (готовим исходные данные)
   let action = addPost("it-kamasutra.com");
   //2.action (коллбэк, к-рый является непосредственно тестом)
   let newState = profileReducer(state, action);
   //3.expectation (ожидаем (expect), что наше значение (newState.posts.length) будет равно (toBe) четырем (4))
   expect(newState.posts[3].message).toBe("it-kamasutra.com")
});

//реализуем тест TDD (test drived developed), тест на , чего еще нет
//будет возможность удалить пост
test('after deletting length o messages should be decremented', () => {
   //1.test data (готовим исходные данные)
   let action = deletePost(1); // здесь id=1
   //2.action (коллбэк, к-рый является непосредственно тестом)
   let newState = profileReducer(state, action);
   //3.expectation (ожидаем (expect), что наше значение (newState.posts.length) будет равно (toBe) четырем (4))
   expect(newState.posts.length).toBe(2)
});

test(`after deletting length of messages shouldn't be decremented if id is incorrect`, () => {
   //1.test data (готовим исходные данные)
   let action = deletePost(100); // здесь id=1
   //2.action (коллбэк, к-рый является непосредственно тестом)
   let newState = profileReducer(state, action);
   //3.expectation (ожидаем (expect), что наше значение (newState.posts.length) будет равно (toBe) четырем (4))
   expect(newState.posts.length).toBe(3)
});
