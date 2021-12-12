import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { QueryHelper } from '@helpers/query.helper';

export interface HttpOptions {
    headers?: HttpHeaders;
    params?: HttpParams;
    withCredentials?: boolean;
}

@Injectable()
export class HttpService {

    public static authenticatedUser;
    public static token;

    protected static prepareUrl(url: string) {
        if (url.startsWith('/')) {
            return environment.host + url;
        }

        return environment.apiHost + url;
    }

    private static parseErrorResponse(response: HttpErrorResponse = {} as any): Observable<any> {
        const data = response.error || response;
        return throwError(data);
    }

    private static parseSuccessResponse(response): Observable<any> {
        return of(response);
    }

    constructor(
        protected http: HttpClient,
    ) {
    }

    public get(url: string, data: any = {}, options: HttpOptions = {}): Observable<any> {
        const withCredentials = options.withCredentials === undefined || options.withCredentials;
        const headers = options.headers || new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(HttpService.prepareUrl(url), {
            params: QueryHelper.getHttpParams(data),
            ...options,
            withCredentials,
            headers,
            responseType: 'json',
        }).pipe(
            switchMap((response: any) => {
                return HttpService.parseSuccessResponse(response);
            }),
            catchError((response) => HttpService.parseErrorResponse(response)),
        );
    }

    public post(url: string, data: any = {}, options: HttpOptions = {}): Observable<any> {
        return this.http.post(HttpService.prepareUrl(url), data, options).pipe(
            switchMap((response: any) => {
                return HttpService.parseSuccessResponse(response);
            }),
            catchError((response) => HttpService.parseErrorResponse(response)),
        );
    }

    public put(url: string, data: any, options: HttpOptions = {}): Observable<any> {
        return this.http.put(HttpService.prepareUrl(url), data, options).pipe(
            switchMap((response: any) => {
                return HttpService.parseSuccessResponse(response);
            }),
            catchError((response) => HttpService.parseErrorResponse(response)),
        );
    }

    public delete(url: string, data: any = {}, options: HttpOptions = {}): Observable<any> {
        return this.http.delete(HttpService.prepareUrl(url), { params: QueryHelper.getHttpParams(data), ...options }).pipe(
            switchMap((response: any) => {
                return HttpService.parseSuccessResponse(response);
            }),
            catchError((response) => HttpService.parseErrorResponse(response)),
        );
    }
}
