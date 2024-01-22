import { ComponentRef, Directive, Input, TemplateRef, ElementRef, HostListener, OnInit, Renderer2, ViewContainerRef, ComponentFactory, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { NgControl } from '@angular/forms';
import { QmClearInputButtonComponent } from './qm-clear-input-button/qm-clear-input-button.component';

@Directive({
  selector: '[appQmClearInput]'
})
export class QmClearInputDirective implements OnInit{
  Ref = this.viewContainerRef.createComponent(QmClearInputButtonComponent);

  constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver,) { }


  ngOnInit(): void {
    const factory= this.resolver.resolveComponentFactory(QmClearInputButtonComponent);
    this.Ref = factory.create(this.viewContainerRef.injector);
    this.viewContainerRef.insert(this.Ref.hostView);
    this.Ref.instance.clear.subscribe(() =>  {

      this.updateButtonVisibility('');
    });
   //  this.updateButtonVisibility(this.control.value);
  }


  @HostListener('input',['$event'])
  onInput(event: any) {
    if(!event){console.log('no');}
    else{
      this.updateButtonVisibility(event.target.value);
    }

  }

  updateButtonVisibility(inputText: string) {
    if (inputText) {

      this.Ref.instance.isVisible = true;
    } else {
      this.Ref.instance.isVisible = false;
    }
  }
}
