import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ElementRef } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have human title for seo`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Книжная полка фронтендера');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Книжная полка фронтендера');
  });

  it('expect correct links for menu items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: Element = fixture.debugElement.nativeElement;

    const allLinks: NodeList = compiled.querySelectorAll('a');
    expect(allLinks.length).toBe(2);

    const mainHref = compiled.querySelector('.menu li:first-child a')
      .getAttribute('href');
    const addHref = compiled.querySelector('.menu li:last-child a')
      .getAttribute('href');
    expect(mainHref).toEqual('/books');
    expect(addHref).toEqual('/book-add');
  });

  it('should have header & main tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('header')).toBeDefined();
    expect(compiled.querySelector('main')).toBeDefined();
  });

});
