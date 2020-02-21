import { Component } from '@angular/core';
import { ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { locale as english } from './i18n/en';
import { locale as russian } from './i18n/ru';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from 'app/service/dashboard.service';
import  * as moment from 'moment'


@Component({
    selector   : 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit
{
    dataSource = {
        chartType: 'line',
        datasets : {
            'chart'    : [{
                label: 'Amount',
                data: [],
                fill: 'start'
            }]
        },
        labels   : null,
        colors   : [
            {
                borderColor              : '#3949ab',
                backgroundColor          : '#3949ab',
                pointBackgroundColor     : '#3949ab',
                pointHoverBackgroundColor: '#3949ab',
                pointBorderColor         : '#ffffff',
                pointHoverBorderColor    : '#ffffff'
            },
            {
                borderColor              : 'rgba(30, 136, 229, 0.87)',
                backgroundColor          : 'rgba(30, 136, 229, 0.87)',
                pointBackgroundColor     : 'rgba(30, 136, 229, 0.87)',
                pointHoverBackgroundColor: 'rgba(30, 136, 229, 0.87)',
                pointBorderColor         : '#ffffff',
                pointHoverBorderColor    : '#ffffff'
            }
        ],
        options  : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            tooltips           : {
                position : 'nearest',
                mode     : 'index',
                intersect: false
            },
            layout             : {
                padding: {
                    left : 24,
                    right: 32
                }
            },
            elements           : {
                point: {
                    radius          : 4,
                    borderWidth     : 2,
                    hoverRadius     : 4,
                    hoverBorderWidth: 2
                }
            },
            scales             : {
                xAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks    : {
                            fontColor: 'rgba(0,0,0,0.54)'
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            tickMarkLength: 16
                        },
                        ticks    : {
                            stepSize: 1000
                        }
                    }
                ]
            },
            plugins            : {
                filler: {
                    propagate: false
                }
            }
        }
    };
    dateForm: FormGroup;
    
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _dashboardService: DashboardService,
        private _formBuilder: FormBuilder
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, russian);
        this._registerCustomChartJSPlugin();
    }

    ngOnInit(): void {
        this._fuseTranslationLoaderService.loadTranslations(english, russian);
        this.dateForm = this.createDateForm()
        this.getDataSource()
        
    }

    getDataSource(): void {
        let query = {}
        let date_array = []
        let startDate = new Date(moment(this.dateForm.controls.start.value).format('YYYY/MM/DD'))
        let endDate = new Date(moment(this.dateForm.controls.end.value).format('YYYY/MM/DD'))
        
        let req = {
            // query: query,
            start: startDate,
            end: endDate
        }
        this._dashboardService.find(req).then(response => {
            
            this.dataSource.datasets.chart[0].data = response.data
            this.dataSource.labels = response.label
        })
    }
    createDateForm(): FormGroup
    {   
        let startdate = moment().add(-20, 'days')
        return this._formBuilder.group({
            start        : [startdate],
            end          : [moment()]
        });
    }

    filter() {
        this.getDataSource();
    }

    private _registerCustomChartJSPlugin(): void
    {
        (window as any).Chart.plugins.register({
            afterDatasetsDraw: function(chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                )
                {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function(dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if ( !meta.hidden )
                    {
                        meta.data.forEach(function(element, index): any {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (window as any).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }
}
