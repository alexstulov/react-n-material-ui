import { BehaviorSubject } from 'rxjs';

import {fakeLogin} from '../helpers/FakeBackend';

import {apiUrl} from '../constants';
const handleResponse = (response: any) => {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401,403].indexOf(response.status) !== -1) {
                authenticationService.logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

const localStorageCurrentUser = localStorage.getItem('currentUser');
const currentUserSubject = new BehaviorSubject(localStorageCurrentUser ? JSON.parse(localStorageCurrentUser) : localStorageCurrentUser);

export interface UserType {
    id: number;
    username: string;
    fistName: string;
    lastName: string;
    token: string;
}

export const emptyUser = {
    id: -1,
    username: '',
    fistName: '',
    lastName: '',
    token: ''

};

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value}
};

function login (username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fakeLogin(`${apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user: UserType) => {
        if (!user) return emptyUser;
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);

        return user;
    })
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
};

