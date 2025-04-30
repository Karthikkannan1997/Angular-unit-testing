import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';

@Component({
  template: `<p appHighlight>Test Text</p>`,
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports:[HighlightDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should have red background color by default', () => {
    const p: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(p.style.backgroundColor).toBe('red');
  });

  it('should increase font size to 30px on mouse enter', () => {
    const p: HTMLElement = fixture.nativeElement.querySelector('p');
    const event = new Event('mouseenter');

    p.dispatchEvent(event);
    fixture.detectChanges();

    expect(p.style.fontSize).toBe('30px');
  });

  it('should reset font size to 20px on mouse leave', () => {
    const p: HTMLElement = fixture.nativeElement.querySelector('p');

    p.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(p.style.fontSize).toBe('30px'); // Ensure it changed first

    p.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(p.style.fontSize).toBe('20px');
  });
});
