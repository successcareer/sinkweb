import { Injectable } from '@angular/core'
import feathers from '@feathersjs/feathers'
import feathersSocketIOClient from '@feathersjs/socketio-client';
import * as feathersRx from 'feathers-reactive';
import * as io from 'socket.io-client'
@Injectable()
export class Feathers {
    private _feathers = feathers();
    private _socket = io('http://192.168.88.27:3030');
    constructor() {
        this._feathers.configure(feathersSocketIOClient(this._socket))
        .configure(feathersRx({ 
            idField: '_id'
          }));
    }

    public service(name: string) {
        return this._feathers.service(name)
    }
}