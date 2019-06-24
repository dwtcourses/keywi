import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {KeyItemEto} from '../../common/to/KeyItemEto';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-keylist-details-element-details',
  templateUrl: './keylist-details-element-details.component.html',
  styleUrls: ['./keylist-details-element-details.component.css']
})
export class KeylistDetailsElementDetailsComponent implements OnInit, OnChanges {

  @Input()
  value: KeyItemEto;
  @Output()
  saveClicked = new EventEmitter<KeyItemEto>();
  @Output()
  cancelClicked = new EventEmitter();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get isNew(): boolean {
    return this.value && !this.value.id;
  }

  get keyFormControl(): AbstractControl {
    return this.formGroup.get('key');
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      key: new FormControl({value: '', disabled: !this.isNew}),
      name: ['', Validators.required],
      value: ['', Validators.required],
      comment: ['', []],
      disabled: [false, []]
    });
    this.updateForm();
  }

  onCancel($evt: any) {
    this.updateForm();
    this.cancelClicked.emit();
  }

  onSave($evt: any) {
    const result = Object.assign({}, this.value, this.formGroup.value);
    this.saveClicked.emit(result);
  }

  private updateForm() {
    if (this.value && this.formGroup) {
      this.formGroup.reset({
        key: this.value.key,
        name: this.value.name,
        value: this.value.value,
        comment: this.value.comment,
        disabled: this.value.disabled
      });
      if (this.isNew) {
        this.keyFormControl.enable();
      } else {
        this.keyFormControl.disable();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }
}