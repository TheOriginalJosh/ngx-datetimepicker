import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { isMobile } from '../services/isMobile.service';
import { DateService, dayOfTheMonth } from '../services/date.service';

@Component({
    selector: 'ngx-datepicker',
    template: require('./datePicker.component.html'),
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['../../assets/date-picker.css']
})

export class DatePickerComponent implements OnInit {
    @Input() selectedDate: Date;
    @Output() selectedDateChange = new EventEmitter<Date>();

    @HostListener('document:click', ['$event'])
    offClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    }

    pickerVisible: boolean = false;

    get formattedDate() {
        return this.dateService.formatMMDDYYYY(this.selectedDate);
    }

    constructor(public isMobile: isMobile, public dateService: DateService, private eRef: ElementRef) { }

    ngOnInit() {
        //If no date is selected then default to today's date.
        if (!this.selectedDate) {
            this.selectedDate = new Date();
        }
        if (typeof this.selectedDate == 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }
    }

    newDatePicked(date: Date): void {
        this.selectedDateChange.emit(date);
        this.selectedDate = date;
    }

}