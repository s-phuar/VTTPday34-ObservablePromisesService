export interface QueryParams{
    query: string
    limit: number
    rating: string
}

export interface GiphyResults {
    data: GifObject[];
  }

export interface GifObject {
    images: Images;
  }

export interface Images {
    fixed_height: FixedHeight;
  }
  
export interface FixedHeight {
    url: string;
  }
  

