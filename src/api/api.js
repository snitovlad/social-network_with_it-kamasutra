import axios from "axios";

const instance = axios.create({  //создали отдельный экземпляр axios и настроили его
   withCredentials: true,  //благодаря этому цепляется cookie с локального хоста на другой домен
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      "API-KEY": "760f4e50-1d38-43e0-a1cf-69f50254c676"  //нужно для .delete и .post
   }
})

export const usersAPI = {  //создали объект с методами для axios

   getUsers(currentPage = 1, pageSize = 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {    //можно просто .then(response => response.data) это чтобы избавиться от избытка данных в response
            return response.data;  //получилась цепочка promise
         })
   },

   unfollow(usersId) {
      return instance.delete(`follow/${usersId}`)
   },

   follow(usersId) {
      return instance.post(`follow/${usersId}`, {}) //не понятно надо ли {} вторым параметром (он не ставил)
   },
   
   getProfile(userId) {
      return profileAPI.getProfile(userId) //делегировали, чтобы не дублировался код ниже, т.к. перенесли
   }

}

export const profileAPI = {
   getProfile(userId) {
      return instance.get(`profile/` + userId);
   },
   getStatus(userId) {
      return instance.get(`profile/status/` + userId);
   },
   updateStatus(status) {
      return instance.put(`profile/status/`, {status: status})
   }
}

export const authAPI = {  //создали объект с методами для axios
   me() {
      return instance.get(`auth/me`)
         //.then(response => response.data);  //получилась цепочка promise
   },
   login(email, password, rememberMe=false) {
      return instance.post(`auth/login`, {email, password, rememberMe});
   },
   logout() {
      return instance.delete(`auth/login`);
   }

}

/*export const getUsers = (currentPage = 1, pageSize = 10) => {
   return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, 
   {
      withCredentials: true
   })
   .then(response => {    //можно просто .then(response => response.data) это чтобы избавиться от избытка данных в response
      return response.data;  //получилась цепочка promise
   })
}*/