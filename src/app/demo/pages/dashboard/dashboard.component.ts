// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { API_URL } from 'src/app/demo/models/enum'
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { NeoFeedbackApiResponse } from '../../models/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export default class DashboardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  neoData = []

  ngOnInit() {
    this.getNeoData()
  }

  getNeoData() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    const dayBefore = new Date()
    dayBefore.setDate(dayBefore.getDate() - 1)
    const formatedDayBefore = formatDate( dayBefore, 'yyyy-MM-dd', 'en')
    const completeURL = `${API_URL.NEO_FEED}?startDate=${formatedDayBefore}&endDate=${today}$nearest10=true`

    this.http.get<NeoFeedbackApiResponse>(completeURL).subscribe(data => {
      this.neoData = data['payload']['near_earth_objects']
    })
  }

  redirect() {
    this.router.navigate(['/neo'])
  }
}
