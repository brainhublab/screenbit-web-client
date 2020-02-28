import { NumberSymbol } from '@angular/common';

export class ApiFile {
  id: number;
  url: string;
  file: string;
  created_at: string;
  updated_at: string;
}

export class Ad {

  createplaceholder?: boolean;

  id: number;
  url: string;
  creator: string;
  creator_id: number;
  title: string;
  description: string;
  file: Array<ApiFile>;
  media_type: 'IM' | 'VD';
  created_at: string;
  updated_at: string;
  programs: any;
}
