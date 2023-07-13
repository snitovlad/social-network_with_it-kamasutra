import axios from "axios";

const instance = axios.create({  //создали отдельный экземпляр axios и настроили его
   withCredentials: true,  //не понятно, надо ли и как {} вторым параметром для post
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      "API-KEY": "8784395f-18d0-47ba-a3e5-6cbc454c63e1"  //нужно для .delete и .post
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
         .then(response => response.data);  //получилась цепочка promise
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
         .then(response => response.data);  //получилась цепочка promise
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