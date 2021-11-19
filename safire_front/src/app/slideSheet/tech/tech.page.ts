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
  project_id: string = localStorage.project_id

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // if(event.key == 'ArrowLeft'){
    //   // this.currentPageIndex = table.indexOf(this.currentPage);
    //   this.toPrevPage();
    // }
    // else this.router.navigate(['/article', this.project_id])

    this.router.navigate(['/article', this.project_id])
  }

  toPrevPage = () => {
    this.router.navigate(['/slides', 'points']);
  }
}
