import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormatarNumeroPipe } from '../pipes/formatar-numero.pipe';

@Directive({
  selector: '[appFormatarNumero]'
})
export class FormatarNumeroDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: FormatarNumeroPipe
  ) {
    this.el = this.elementRef.nativeElement;
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  ngOnInit() {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("change", ["$event.target.value"])
  onChange(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("keyup", ["$event.target.value"])
  onKeyUp(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("keydown", ["$event.target.value"])
  onKeyDown(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("enter", ["$event.target.value"])
  onEnter(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

  @HostListener("leave", ["$event.target.value"])
  onLeave(value: string) {
    this.currencyPipe.transformAsync(this.el.value)
      .then(data => this.el.value = data);
  }

}
