import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

const commonStyle = {
  'stroke': '#ffffff',
  'stroke-width': '1',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-miterlimit': '10',
}

@Component({
  selector: 'app-sofia-svg-map',
  templateUrl: './sofia-svg-map.component.html',
  styleUrls: ['./sofia-svg-map.component.less']
})
export class SofiaSvgMapComponent implements AfterViewInit {

  public readonly colorScheme = {
    // main: '#dac1a7',
    // regular: '#dac1a7', //dad1a7',
    // secondary: '#eddfd0',
    // external: '#dca48f',
    // parks: '#2b8028',
    // hills: '#add6a8',
    // ground: '#eeeeee',
    main: '#8796c0',
    regular: '#7aa3e5',
    secondary: '#adcded',
    external: '#ad6886',
    parks: '#00b862',
    hills: '#add6a8',
    ground: '#eeeeee',
  };

  public readonly styles = {
    main: {
      fill: this.colorScheme.main,
      ...commonStyle
    },
    regular: {
      fill: this.colorScheme.regular,
      ...commonStyle
    },
    secondary: {
      fill: this.colorScheme.secondary,
      ...commonStyle
    },
    external: {
      fill: this.colorScheme.external,
      ...commonStyle
    },
    externalSimple: {
      fill: this.colorScheme.external,
    },
    parks: {
      fill: this.colorScheme.parks,
      ...commonStyle
    },
    hills: {
      fill: this.colorScheme.hills,
      ...commonStyle
    },
    ground: {
      fill: this.colorScheme.ground,
      ...commonStyle
    },
  };

  @ViewChild('sofiaSvgElement') sofiaSvgElement: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
  }

  onSvgClick(event: MouseEvent) {
    if (event.target instanceof SVGPathElement) {
      const titles = event.target.getElementsByTagName('title');
      if (titles?.length > 0) {
        const selected: string = titles[0].textContent;
      }
    }
  }
}
