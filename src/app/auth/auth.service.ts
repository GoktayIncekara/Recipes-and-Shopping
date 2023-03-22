import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAttd-yP5aYiGx_Fd-9IMJT_ofIfMiwUpo",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAttd-yP5aYiGx_Fd-9IMJT_ofIfMiwUpo",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
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