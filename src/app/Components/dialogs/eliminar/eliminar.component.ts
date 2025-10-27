import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EliminarComponent {

}
