import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

// import table from 'src/app/slide.config';

@Component({
  selector: 'app-title',
  templateUrl: './title.page.html',
  styleUrls: ['./title.page.scss'],
})
export class TitlePage implements OnInit {
  // currentPage: string = 'title';
  // currentPageIndex: any = table.indexOf(this.currentPage);

  title: string = JSON.parse(localStorage.abstract)["title"]
  thumbnail: string = JSON.parse(localStorage.abstract)["thumbnail"]
  background: string = "#" + JSON.parse(localStorage.abstract)["color"]

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.ngOnInit();
    if(event.key == 'Enter' || event.key == 'ArrowRight'){
      // this.currentPageIndex = table.indexOf(this.currentPage);
      this.ngOnInit();
      this.toNextPage();
    }
  }

  toNextPage = () => {
    this.router.navigate(['/slides', 'background']);
  }
}
