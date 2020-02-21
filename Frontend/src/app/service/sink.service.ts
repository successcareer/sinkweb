import { Injectable } from '@angular/core'
import { Feathers} from './feathers.service'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SinkService implements Resolve<any> 
{
    onSinkChanged: BehaviorSubject<any>;
    routeParams: any;
    sink: any;
    constructor(private feathers: Feathers){
        this.onSinkChanged = new BehaviorSubject({});
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
            this.feathers.service('sink').find({query: query}).then(response => {
                resolve(response)
            });
        })
    }

    get(): Promise<any>{
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.feathers.service('setting').find({}).then(response => {
                    this.feathers.service('carmake').find({}).then(carres => {
                        console.log('makes', carres)
                        let res = {
                            status: 'new',
                            settings: response.data,
                            carmakes: carres
                        }
                        this.onSinkChanged.next(res)
                        resolve(res)
                    })
                    
                }).catch(error => reject);

            }
            else
            {
                this.feathers.service('sink').get(this.routeParams.id).then(response => {
                    this.sink = response
                    this.onSinkChanged.next(this.sink)
                    resolve(response)
                }).catch(error => reject);
            }
        });
    }

    add(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this.feathers.service('sink').create(data).then(response => {
                resolve(response)
            })
        })
    }

    update(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this.feathers.service('sink').patch(data._id, data).then(response => {
                resolve(response)
            })
        })
    }

    delete(id): Promise<any>{
        return new Promise((resolve, reject) => {
            this.feathers.service('sink').remove(id).then(response => {
                resolve(response)
            })
        })
    }

    getModel(id) {
        return new Promise((resolve, reject) => {
            let query = {
                make_id: id
            }
            this.feathers.service('carmodel').find({query: query}).then(response => {
                resolve(response)
            })
        })
    }


}