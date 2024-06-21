import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appMatchWidth]'
})
export class MatchWidthDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const sibling = this.el.nativeElement.previousElementSibling;

    if (sibling) {
      const siblingWidth = sibling.offsetWidth;
      this.renderer.setStyle(this.el.nativeElement, 'width', `${siblingWidth}px`);
    }
  }
}