import { ServiceDetail } from '../servicedetail/service.model';

export class Sink {
    id: String;
    carnumber: String;
    carmake: Object;
    carmodel: Object;
    boxnumber: String;
    services: ServiceDetail[];
    constructor(sink?) {
        sink = sink || {};
        this.id = sink._id || '';
        this.carnumber = sink.carnumber || '';
        this.carmake = sink.carmake || '';
        this.carmodel = sink.carmodel || '';
        this.boxnumber = sink.boxnumber || '';
        sink.services = sink.services || [];
        this.services = []
        for(let i = 0; i < sink.services.length; i++) {
            let service = new ServiceDetail(sink.services[i])
            service.id = sink.services[i].id
            this.services.push(service)
        }
    }
}