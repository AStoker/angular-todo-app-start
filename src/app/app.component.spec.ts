import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports: [
                    FormsModule
                ],
                declarations: [
                    AppComponent
                ],
                providers: [
                    {
                        provide: ComponentFixtureAutoDetect, useValue: true
                    }
                ]
            })
            .compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should render title', () => {
        const compiled = fixture.nativeElement.shadowRoot as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('My Todo\'s');
    });

});
