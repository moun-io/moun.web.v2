export class API_URL{
    static  BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
    static AUTH_LOGIN= this.BASE_URL+ "/auth/login";
    static AUTH_CHECK = this.BASE_URL+ "/auth/check";
    static  AUTH_REGISTER= this.BASE_URL+ "/auth/register";
    static MEMBER_GET= this.BASE_URL + "/member/";
}