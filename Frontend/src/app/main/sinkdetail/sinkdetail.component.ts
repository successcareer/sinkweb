import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { locale as english } from './i18n/en';
import { locale as russian } from './i18n/ru';
import { fuseAnimations } from '@fuse/animations';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
import { Sink } from '../sink/sink.Model';
import { SinkService } from 'app/service/sink.service';
import { ServiceDetail } from '../servicedetail/service.model';
import {ConfirmationDialog} from '../confirmdialog/confirmdialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
    selector: 'sinkdetail',
    templateUrl: './sinkdetail.component.html',
    styleUrls: ['./sinkdetail.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class SinkDetailComponent implements OnInit, OnDestroy
{
    pageType: string;
    sinkDetail: Sink;
    sinkForm: FormGroup;
    services: any[];
    makes: any[];
    models: any[];
    selectedMake: String;
    selectedModel: String;
    selectedServices: any[];
    private _unsubscribeAll: Subject<any>;
    _id: string;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private sinkService: SinkService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private _translateService: TranslateService,
        private router: Router
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, russian);
        this.sinkDetail = new Sink();
        this._unsubscribeAll = new Subject();
        
    }

    ngOnInit(): void {
        this._id = this.route.snapshot.params.id
        this.sinkService.onSinkChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            this.selectedServices = []
            if(response.status === 'new') {
                this.pageType = 'new';
                this.sinkDetail = new Sink()
            } else {
                this.sinkDetail = new Sink(response)
                this.pageType = 'edit';
            }
            for(let i = 0; i < this.sinkDetail.services.length; i++) {
                this.selectedServices.push(this.sinkDetail.services[i].id)
            }
            this.selectedMake = this.sinkDetail.carmake["_id"];
            this.selectedModel = this.sinkDetail.carmodel["_id"];
            this.getModels()
            this.services = response.settings
            this.makes = response.carmakes
            this.sinkForm = this.createProductForm()
        })
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    changeMake(){
        this.selectedModel = null
        this.getModels()
    }

    getModels() {
        this.sinkService.getModel(this.selectedMake).then((res: any[]) => {
            this.models = res
        })
    }

    addSink() {
        const data = this.sinkForm.getRawValue();
        let makeindex = this.makes.findIndex(f => f._id === this.selectedMake)
        data.carmake = this.makes[makeindex]

        let modelindex = this.models.findIndex(f => f._id === this.selectedModel)
        data.carmodel = {
            _id: this.models[modelindex]._id,
            model: this.models[modelindex].model
        }
        let array = []
        for(let i=0; i < data.services.length; i++){
            let index = this.services.findIndex(f => f._id === data.services[i])
            let obj = {
                id: this.services[index]._id,
                name: this.services[index].name,
                price: this.services[index].price
            }
            array.push(obj)
        }
        data.services = array
        this.sinkService.add(data).then(response => {
            this.router.navigateByUrl('/sink')
        })
    }

    saveSink() {
        this.saveDialog()
    }

    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            carnumber            : [this.sinkDetail.carnumber],
            carmake          : [this.sinkDetail.carmake],
            carmodel         : [this.sinkDetail.carmodel],
            boxnumber          : [this.sinkDetail.boxnumber],
            services          : [this.services]
        });
    }

    saveDialog() {
        const dialogRef = this.dialog.open(ConfirmationDialog,{
            data:{
                message: this._translateService.instant("SAVEDIALOG"),
                buttonText: {
                    ok: this._translateService.instant("YES"),
                    cancel: this._translateService.instant("NO")
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                const data = this.sinkForm.getRawValue();
                let makeindex = this.makes.findIndex(f => f._id === this.selectedMake)
                data.carmake = this.makes[makeindex]

                let modelindex = this.models.findIndex(f => f._id === this.selectedModel)
                data.carmodel = {
                    _id: this.models[modelindex]._id,
                    model: this.models[modelindex].model
                }
                data._id = this._id
                let array = []
                for(let i=0; i < data.services.length; i++){
                    let index = this.services.findIndex(f => f._id === data.services[i])
                    let obj = {
                        id: this.services[index]._id,
                        name: this.services[index].name,
                        price: this.services[index].price
                    }
                    array.push(obj)
                }
                data.services = array
                this.sinkService.update(data).then(response => {
                    this.router.navigateByUrl('/sink')
                })
            }
        });
    }
}
