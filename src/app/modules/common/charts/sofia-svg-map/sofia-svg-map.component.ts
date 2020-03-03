import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const commonStyle = {
  'stroke': '#ffffff',
  'stroke-width': '1',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-miterlimit': '10',
}


const defaultColorScheme = {
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

export interface MapStatDataRow {
  id: string;
  value: number;
};
@Component({
  selector: 'app-sofia-svg-map',
  templateUrl: './sofia-svg-map.component.html',
  styleUrls: ['./sofia-svg-map.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SofiaSvgMapComponent),
    }
  ]
})
export class SofiaSvgMapComponent implements ControlValueAccessor, AfterViewInit, OnChanges {

  public zoomed = false;
  @ViewChild('sofiaSvgElement') sofiaSvgElement: ElementRef;
  private colorScheme = defaultColorScheme;

  public styles = this.getStyles();
  private getStyles() {

    return {
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
  }

  @Input() public disabled = false;
  @Input() public formItem = false;
  @Input() public statisticsData?: Array<MapStatDataRow>;
  private onChange: (_: Array<string>) => void;
  private onTouched: () => void;


  ngOnChanges(changes: SimpleChanges) {
    const statisticsDataChange = changes.statisticsData;
    if (statisticsDataChange && statisticsDataChange.currentValue !== statisticsDataChange.previousValue) {
      if (this.statisticsData) {
        this.colorScheme = {
          main: '#7aa3e5',
          regular: '#7aa3e5',
          secondary: '#7aa3e5',
          external: '#7aa3e5',
          parks: '#7aa3e5',
          hills: '#7aa3e5',
          ground: '#7aa3e5',
        };
      } else {
        this.colorScheme = defaultColorScheme;
      }
      this.styles = this.getStyles();
      this.updateMapStats();
    } else {
    }
  }

  private updateMapStats() {
    if (!this.svgElement || !this.statisticsData) {
      return;
    }
    const titles = this.svgElement.getElementsByTagName('title');
    const defaultOpacityValue = .1;
    for (let i = 0; i <= titles.length; i++) {
      const el = this.statisticsData?.find(v => {

        const r = v.id === titles[i]?.getAttribute('id');
        return r;
      });
      this.setOpacity(el ? el.value : defaultOpacityValue, titles[i]);
    }
  }

  private get isEditable() {
    return !this.disabled && this.formItem;
  }



  writeValue(newAreasIds?: Array<string>) {
    if (!this.svgElement) {
      return;
    }
    console.log('write v', newAreasIds);
    const titles = this.svgElement.getElementsByTagName('title');
    let isSelected = false;
    for (let i = 0; i <= titles.length; i++) {
      isSelected = newAreasIds?.includes(titles[i].getAttribute('id'));
      this.setSelected(isSelected, titles[i]);
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.updateMapStats();
  }

  private get svgElement(): SVGElement | null {
    return this.sofiaSvgElement ? this.sofiaSvgElement.nativeElement as SVGElement : null;
  }

  onSvgClick(event: MouseEvent) {
    if (!this.isEditable) {
      return;
    }

    if (event.target instanceof SVGPathElement) {
      const titles = event.target.getElementsByTagName('title');
      if (titles?.length > 0) {
        const titleEl = titles[0];
        this.setSelected(!this.isSelected(titleEl), titleEl);
        this.runOnChange();
      }
    }
  }

  private runOnChange() {
    if (this.isEditable && this.onChange) {
      const result: Array<string> = [];
      const titles = this.svgElement?.getElementsByTagName('title');
      for (let i = 0; i < titles.length; i++) {
        if (this.isSelected(titles[i])) {
          result.push(titles[i].getAttribute('id'));
        }
      }

      this.onChange(result);
    }
  }

  private setSelected(value: boolean, titleElement?: HTMLElement) {
    if (titleElement) {
      const path: HTMLElement = titleElement.parentElement;
      if (value) {
        path.classList.add('selected');
      } else {
        path.classList.remove('selected');
      }
    }
  }

  private setOpacity(value: number | string, titleElement?: HTMLElement) {
    if (titleElement) {
      const path: HTMLElement = titleElement.parentElement;
      console.log('set ', value)
      path.style.fillOpacity = `${value}`;
    }
  }

  private isSelected(titleElement?: HTMLElement) {
    if (titleElement) {
      return titleElement.parentElement.classList.contains('selected');
    }
    return false;
  }
}
