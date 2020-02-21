import { Injectable } from '@angular/core'
import { Feathers} from './feathers.service'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SettingService implements Resolve<any> 
{
    onServiceChanged: BehaviorSubject<any>;
    routeParams: any;
    service: any;
    constructor(private feathers: Feathers){
        this.onServiceChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.get()
            ]).then(
                (response) => {
                    resolve(response);
                },
                reject
            );
        });
    }

    find(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.feathers.service('setting').find({query: query}).then(response => {
                resolve(response)
            });
        })
    }

    get(): Promise<any>{
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onServiceChanged.next(false);
                resolve(false);
            }
            else
            {
                this.feathers.service('setting').get(this.routeParams.id).then(response => {
                    this.service = response
                    this.onServiceChanged.next(this.service)
                    resolve(response)
                }).catch(error => reject);
            }
        });
        
    }

    add(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this.feathers.service('setting').create(data).then(response => {
                resolve(response)
            })
        })
    }

    update(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this.feathers.service('setting').patch(data._id, data).then(response => {
                resolve(response)
            })
        })
    }

    delete(id): Promise<any>{
        return new Promise((resolve, reject) => {
            this.feathers.service('setting').remove(id).then(response => {
                resolve(response)
            })
        })
    }


}