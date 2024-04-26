import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-request-dialog',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.css'
})
export class RequestDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {}
}
