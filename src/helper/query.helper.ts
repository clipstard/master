import {HttpParams} from '@angular/common/http';
import {forEach} from 'lodash';

export class QueryHelper {
    public static getHttpParams(data: any): HttpParams {
        let params = new HttpParams();
        if (data.password !== undefined) {
            data.password = data.password.replace('+', '**');
        }
        const processedData = QueryHelper.jsonToArray(data);
        forEach(processedData, (item) => {
            params = params.append(item.key, item.value);
        });
        return params;
    }

    public static jsonToArray(data: any, key: string = null, list: any = []) {
        if (typeof(data) === 'object') {
            forEach(data, (item, index) => {
                QueryHelper.jsonToArray(item, key ? key + '[' + index + ']' : index, list);
            });
        } else if (typeof(data) === 'object') {

        } else {
           if (key === 'password' || key === 'username') {
            list.push({
                key,
                value: data
            });
           } else {
               list.push({
                   key,
                   value: encodeURIComponent(data)
               });
           }
        }
        return list;
    }
}
