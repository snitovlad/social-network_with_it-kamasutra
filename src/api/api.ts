import { ProfileType } from './../types/types';
import axios, { AxiosResponse } from "axios";

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

   unfollow(userId: number) {
      return instance.delete(`follow/${userId}`)
   },

   follow(userId: number) {
      return instance.post(`follow/${userId}`, {}) //не понятно надо ли {} вторым параметром (он не ставил)
   },
   
   getProfile(userId: number | null) {
      return profileAPI.getProfile(userId) //делегировали, чтобы не дублировался код ниже, т.к. перенесли
   }

}

export const profileAPI = {
   getProfile(userId: number | null) {
      return instance.get(`profile/` + userId);
   },
   getStatus(userId: number) {
      return instance.get(`profile/status/` + userId);
   },
   updateStatus(status: string) {
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
   saveProfile(profile: ProfileType) {
      return instance.put(`profile`, profile)
   }

}

export enum ResultCodesEnum {
   Success = 0,
   Error = 1
}

export enum ResultCodeForCaptchaEnum {
   CaptchaIsRequired = 10
}

type MeResponseType = {
   data: {
      id: number
      email: string
      login: string
   }
   resultCode: ResultCodesEnum
   messages: Array<string>
}

type LoginResponseType = {
   resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
   messages: Array<string>
   data: {
      userId: number
   }
}

type LogoutResponseType = {
   resultCode: ResultCodesEnum 
   messages: Array<string>
   data: {}
}

export const authAPI = {  //создали объект с методами для axios
   me() {
      return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
         //.then(response => response.data);  //чтобы не отдавать в BLL избыточные данные из DAL
   },
   login(email: string, password: string, rememberMe=false, captcha: string | null = null) {
      return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
      .then(res => res.data);
   },
   logout() {
      return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data);
   }
}

export const securityAPI = {
   getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`)
   }
}