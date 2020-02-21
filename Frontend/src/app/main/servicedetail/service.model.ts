export class ServiceDetail {
    id: String;
    name: String;
    price: Number
    constructor(servicedetail?) {
        servicedetail = servicedetail || {};
        this.id = servicedetail._id || '';
        this.name = servicedetail.name || '';
        this.price = servicedetail.price || 0;
    }
}