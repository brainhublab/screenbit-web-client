import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

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

const defaultStatFillColor = '#eeeeee';
const activeStatFillColor = defaultColorScheme.regular;
export type TooltipInfo = Array<{ name: string, value: string, color?: string }>;


export interface MapStatDataRow {
  id: string;
  value: number;
  tooltip?: TooltipInfo;
}

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
export class SofiaSvgMapComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit {

  public zoomed = false;
  @ViewChild('sofiaSvgElement') sofiaSvgElement: ElementRef;
  @ViewChild('tooltip') tooltipElementRef: ElementRef;
  private colorScheme = defaultColorScheme;

  public styles = this.getStyles();

  tooltipInfo: TooltipInfo = [];
  private lastTooltipId: any;

  @Input() public disabled = false;
  @Input() public formItem = false;
  @Input() public statisticsData?: Array<MapStatDataRow>;
  private onChange: (_: Array<string>) => void;
  private onTouched: () => void;

  private mouseMoveEventsSubject = new BehaviorSubject<MouseEvent>(null);
  private mouseMoveSubscription: Subscription;

  ngOnInit() {
    this.mouseMoveSubscription = this.mouseMoveEventsSubject.subscribe(this.updateTooltip);
  }

  ngOnDestroy() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
  }

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

  ngOnChanges(changes: SimpleChanges) {
    const statisticsDataChange = changes.statisticsData;
    if (statisticsDataChange && statisticsDataChange.currentValue !== statisticsDataChange.previousValue) {
      if (this.statisticsData) {
        this.colorScheme = {
          main: defaultStatFillColor,
          regular: defaultStatFillColor,
          secondary: defaultStatFillColor,
          external: defaultStatFillColor,
          parks: defaultStatFillColor,
          hills: defaultStatFillColor,
          ground: defaultStatFillColor,
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
    const defaultOpacityValue = 1;
    for (let i = 0; i <= titles.length; i++) {
      const el = this.statisticsData?.find(v => {

        const r = v.id === titles[i]?.getAttribute('id');
        return r;
      });
      this.setItemStatProps(el ? el.value : defaultOpacityValue, el != null, titles[i]);
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
    // const els = this.svgElement.getElementsByTagName('title');
    // let r = '';
    // for (let i = 0; i < els.length; i++) {
    //   r += `\n<title id="${els[i].id}">${els[i].textContent}</title>`;
    // }
    // console.log(r);
  }

  private get svgElement(): SVGElement | null {
    return this.sofiaSvgElement ? this.sofiaSvgElement.nativeElement as SVGElement : null;
  }

  private get tooltipElement(): HTMLElement | null {
    return this.tooltipElementRef ? this.tooltipElementRef.nativeElement as HTMLElement : null;
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

  onMouseMove(event: MouseEvent) {
    if (!this.statisticsData) {
      return;
    }
    this.mouseMoveEventsSubject.next(event);
  }

  private updateTooltip = (event: MouseEvent | null) => {
    if (!event || !(event.target instanceof SVGPathElement)) {
      this.tooltipInfo = null;
      return;
    }
    const target = event.target;
    const titles = target.getElementsByTagName('title');
    if (titles?.length > 0) {
      if (this.tooltipElementRef) {
        // update tooltip position
        let x = event.clientX;
        let y = event.clientY;

        this.tooltipElement.style.top = (y - 50) + 'px';
        this.tooltipElement.style.left = (x + 10) + 'px';
      }

      const titleEl = titles[0];
      if (titleEl.id === this.lastTooltipId) {
        // same tooltip
        return;
      }
      const statRow = this.statisticsData.find(v => v.id === titleEl.id);
      if (!statRow) {
        // now data for selected area
        this.tooltipInfo = null;
        return;
      }
      this.lastTooltipId = titleEl.id;
      this.tooltipInfo = [
        {
          name: 'Area',
          value: titleEl.textContent
        },
        ...statRow?.tooltip
      ];
    } else {
      this.tooltipInfo = null;
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

  private setItemStatProps(value: number | string, active: boolean, titleElement?: HTMLElement) {
    if (titleElement) {
      const path: HTMLElement = titleElement.parentElement;
      path.style.fill = active ? activeStatFillColor : defaultStatFillColor;
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
