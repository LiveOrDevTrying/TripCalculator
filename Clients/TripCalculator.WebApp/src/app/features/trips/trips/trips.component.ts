import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState, ITrip } from 'src/app/core';
import { ConfirmationmodalComponent, IConfirmationModalData } from 'src/app/shared';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  $tripDeleteSubscription: Subscription;

  displayedColumns: string[] = [
    'tripName',
    'startDate',
    'endDate',
    'userCount',
    'remove'
  ];

  loading = false;
  dataSource = new MatTableDataSource<ITrip>();

  constructor(protected store: Store<AppState>,
    protected toastrService: ToastrService,
    protected router: Router,
    protected matDialog: MatDialog,
    protected tripService: TripService) {
    super(store); 

    this.$tripDeleteSubscription = this.tripService
      .getDeleteTrip()
      .subscribe(success => {
        this.loading = false;

        if (success) {
          this.toastrService.success('The trip was deleted successfully.');
        } else {
          this.toastrService.error('The trip could not be deleted.');
        }
      });
  }

  ngOnInit() {
    this.afterAssignTrips();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$tripDeleteSubscription.unsubscribe();
  }

  afterAssignTrips() {
    if (this.dataSource) {
      this.dataSource.data = this.trips;
    }
  }

  createTrip() {
    this.router.navigateByUrl('/trips/trip');
  }

  removeTrip(id: string) {
    const confirmationModalData: IConfirmationModalData = {
      title: 'Are you sure?',
      message: 'Are you sure you want to delete this trip?',
      isConfirmed: false,
      confirmMessage: 'Confirm',
      cancelMessage: 'Cancel'
    };

    const confirmation = this.matDialog.open(ConfirmationmodalComponent, {
      width: '250px',
      data: confirmationModalData
    });

    confirmation.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.loading = true;

        this.tripService.deleteTrip(id);
      }
    });
  }

  getUserCount(id: string) {
    return this.tripsUsers.filter(x => x.tripId === id).length;
  }
}
