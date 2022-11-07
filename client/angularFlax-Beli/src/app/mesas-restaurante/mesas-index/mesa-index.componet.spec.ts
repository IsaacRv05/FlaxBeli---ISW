import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MesasIndexComponent } from './mesas-index.component';

describe('MesasIndexComponent', () => {
    let component: MesasIndexComponent;
    let fixture: ComponentFixture<MesasIndexComponent>;
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MesasIndexComponent],
        imports: [
          NoopAnimationsModule,
          LayoutModule,
          MatButtonModule,
          MatCardModule,
          MatGridListModule,
          MatIconModule,
          MatMenuModule,
        ]
      }).compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(MesasIndexComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should compile', () => {
      expect(component).toBeTruthy();
    });
  });