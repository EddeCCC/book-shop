import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Books } from './books';
import { provideTranslateService } from '@ngx-translate/core';
import { routes } from '../app.routes';
import { provideRouter } from '@angular/router';

describe('Books', () => {
  let component: Books;
  let fixture: ComponentFixture<Books>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Books],
      providers: [
        provideTranslateService(),
        provideRouter(routes),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Books);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
