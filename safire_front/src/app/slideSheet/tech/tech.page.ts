import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

// import table from 'src/app/slide.config';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.page.html',
  styleUrls: ['./tech.page.scss'],
})
export class TechPage implements OnInit {
  // currentPage: string = 'tech';
  // currentPageIndex: any = table.indexOf(this.currentPage);

  thumbnail: string = JSON.parse(localStorage.abstract)["thumbnail_technology"] || "/assets/img/project_img_none.png"
  abstract_list: string[] = JSON.parse(localStorage.abstract)["abstract_list"][2]
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
      this.toNextPage();
    }
    else if(event.key == 'ArrowLeft'){
      // this.currentPageIndex = table.indexOf(this.currentPage);
      this.toPrevPage();
    }
    console.log('aaa')
    this.router.navigate(['/article'])
  }
  

  toNextPage = () => {
    // これが最後のスライド
  }

  toPrevPage = () => {
    this.router.navigate(['/slides', 'points']);
  }
}
