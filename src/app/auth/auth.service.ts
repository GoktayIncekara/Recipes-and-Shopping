import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAttd-yP5aYiGx_Fd-9IMJT_ofIfMiwUpo",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAttd-yP5aYiGx_Fd-9IMJT_ofIfMiwUpo",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred!";
        switch(errorRes.error?.error?.message) {
            case("EMAIL_EXISTS"):
                errorMessage = "This email is already exists";
                break;
            case("EMAIL_NOT_FOUND"):
                errorMessage = "This email does not exists";
                break;
            case("INVALID_PASSWORD"):
                errorMessage = "This password is not correct";
                break;
        }
        return throwError(()  => new Error(errorMessage));
    }
}