import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

// import table from 'src/app/slide.config';
@Component({
  selector: 'app-background',
  templateUrl: './background.page.html',
  styleUrls: ['./background.page.scss'],
})
export class BackgroundPage implements OnInit {
  // currentPage: string = 'background';
  // currentPageIndex: any = table.indexOf(this.currentPage);

  thumbnail: string = JSON.parse(localStorage.abstract)["thumbnail_background"] || "/assets/img/project_img_none.png"
  abstract_list: string[] = JSON.parse(localStorage.abstract)["abstract_list"][0]
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
      this.ngOnInit();
      this.toNextPage();
    }
    else if(event.key == 'ArrowLeft'){
      this.ngOnInit();
      this.toPrevPage();
    }
  }
  

  toNextPage = () => {
    this.router.navigate(['/slides', 'points']);
  }

  toPrevPage = () => {
    this.router.navigate(['/slides', 'title']);
  }
}
