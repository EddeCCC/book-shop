import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetails } from './book-details';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('BookDetails', () => {
  let component: BookDetails;
  let fixture: ComponentFixture<BookDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetails],
      providers: [
        provideTranslateService(),
        provideRouter(routes),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
