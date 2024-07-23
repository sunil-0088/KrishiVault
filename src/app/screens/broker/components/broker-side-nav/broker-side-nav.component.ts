import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-broker-side-nav',
  templateUrl: './broker-side-nav.component.html',
  styleUrls: ['./broker-side-nav.component.scss'],
})
export class BrokerSideNavComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  isCollapsed = false;
  midScreenWidth = 699;

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.checkScreenWidth();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= this.midScreenWidth) {
      this.isCollapsed = true;
      this.sidebar.nativeElement.classList.add('collapsed');
    } else {
      this.isCollapsed = false;
      this.sidebar.nativeElement.classList.remove('collapsed');
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebar.nativeElement.classList.toggle('collapsed');
  }
}
