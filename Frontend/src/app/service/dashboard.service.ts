import { Injectable } from '@angular/core'
import { Feathers} from './feathers.service'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DashboardService /*implements Resolve<any>  */
{
    onDashboardChanged: BehaviorSubject<any>;
    routeParams: any;
    dashboard: any;
    constructor(private feathers: Feathers){
        this.onDashboardChanged = new BehaviorSubject({});
    }

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    // {
    //     this.routeParams = route.params;
    //     return new Promise((resolve, reject) => {
    //         Promise.all([
    //             this.get()
    //         ]).then(
    //             (response) => {
    //                 resolve(response);
    //             },
    //             reject
    //         );
    //     });
    // }

    find(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.feathers.service('dashboard').find({query: query}).then(response => {
                resolve(response)
            });
        })
    }

    // get(): Promise<any>{
    //     return new Promise((resolve, reject) => {
    //         this.feathers.service('dashboard').get(this.routeParams.id).then(response => {
    //             this.dashboard = response
    //             this.onDashboardChanged.next(this.dashboard)
    //             resolve(response)
    //         }).catch(error => reject);
    //     });
    // }
}