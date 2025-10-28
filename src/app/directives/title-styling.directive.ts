import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitleStyling]',
  standalone: false
})
export class TitleStylingDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'color', '#3f51b5');
    this.renderer.setStyle(this.el.nativeElement, 'fontWeight', '600');
    this.renderer.setStyle(this.el.nativeElement, 'marginBottom', '16px');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
  }
}
