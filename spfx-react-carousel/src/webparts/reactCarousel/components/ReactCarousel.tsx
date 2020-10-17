import * as React from 'react';
import styles from './ReactCarousel.module.scss';
import { IReactCarouselProps } from './IReactCarouselProps';
import { IReactCarouselState } from './IReactCarouselState';
import { escape } from '@microsoft/sp-lodash-subset';

//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import  {Carousel}  from 'react-responsive-carousel';

import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";

import { ServiceScope } from "@microsoft/sp-core-library";
import { IDataService } from '../components/services/IDataService';
import { ImageService } from '../components/services/ImageService';

export default class ReactCarousel extends React.Component<IReactCarouselProps, IReactCarouselState> {

  private dataCenterServiceInstance: IDataService;

  public constructor(props: IReactCarouselProps, state: IReactCarouselState) {
    super(props);
    this.state = {
      imageURLs: []
    };

    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(ImageService.serviceKey);

    this.dataCenterServiceInstance.getImages('ImagesList').then((carouselItems: any) => {
      this.setState({
        imageURLs: carouselItems
      });
    });
  }

  public render(): React.ReactElement<IReactCarouselProps> {
    return (
      <div>
      <Carousel
        buttonsLocation={CarouselButtonsLocation.bottom}
        buttonsDisplay={CarouselButtonsDisplay.block}
        indicatorShape={CarouselIndicatorShape.circle}

        element={this.state.imageURLs.map((imageList)=>{
          return(<div>
            <img src ={imageList}/>
            </div>
            );
        })}
        isInfinite={true}
        pauseOnHover={true}
        onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
        onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
      />
      </div>
    );
  }
}
