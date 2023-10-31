import axios from "axios";

const instance = axios.create({  //создали отдельный экземпляр axios и настроили его
   withCredentials: true,  //благодаря этому цепляется cookie с локального хоста на другой домен
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      "API-KEY": "760f4e50-1d38-43e0-a1cf-69f50254c676"  //нужно для .delete и .post, д.б. двойные кавычки
   }
})

export const usersAPI = {  //создали объект с методами для axios

   getUsers(currentPage = 1, pageSize = 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {    //можно просто .then(response => response.data) это чтобы избавиться от избытка данных в response
            return response.data;  //получилась цепочка promise
         })
   },

   unfollow(usersId: any) {
      return instance.delete(`follow/${usersId}`)
   },

   follow(usersId: any) {
      return instance.post(`follow/${usersId}`, {}) //не понятно надо ли {} вторым параметром (он не ставил)
   },
   
   getProfile(userId: any) {
      return profileAPI.getProfile(userId) //делегировали, чтобы не дублировался код ниже, т.к. перенесли
   }

}

export const profileAPI = {
   getProfile(userId: any) {
      return instance.get(`profile/` + userId);
   },
   getStatus(userId: any) {
      return instance.get(`profile/status/` + userId);
   },
   updateStatus(status: any) {
      return instance.put(`profile/status/`, {status: status})
   },
   savePhoto(photoFile: any) {
      const formData = new FormData();
      formData.append("image", photoFile);
      return instance.put(`profile/photo/`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
   },
   saveProfile(profile: any) {
      return instance.put(`profile`, profile)
   }

}

export const authAPI = {  //создали объект с методами для axios
   me() {
      return instance.get(`auth/me`)
         //.then(response => response.data);  //получилась цепочка promise
   },
   login(email: string, password: string, rememberMe=false, captcha=null as string | null) {
      return instance.post(`auth/login`, {email, password, rememberMe, captcha});
   },
   logout() {
      return instance.delete(`auth/login`);
   }
}

export const securityAPI = {
   getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`)
   }
}