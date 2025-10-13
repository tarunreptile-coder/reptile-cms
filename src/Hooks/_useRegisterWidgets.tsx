import React, { useRef } from 'react';
import {
    RichTextWidgetIcon,
    ImageWidgetIcon,
    ButtonWidgetIcon,
    TopItemWidgetIcon,
    ItemCollection1WidgetIcon,
    ItemCollection2WidgetIcon,
} from '@Reptile/Components/Atoms';
import {
    RichTextWidget,
    ImageWidget,
    ButtonWidget,
    TelerikButtonWidget,
    TelerikChartWidget,
    TopStoryWidget,
    SmallImageListWidget,
    LargeImageCarouselWidget,
    LargeImageListWidget,
    SectionCarouselWidget,
    SmallImageCarouselWidget,
    TwoImageListWidget,
    ButtonWidgetLayout,
    TelerikButtonWidgetLayout,
    TopStoryWidgetLayout,
    ImageWidgetLayout,
    LargeImageCarouselWidgetLayout,
    LargeImageListWidgetLayout,
    RichTextWidgetLayout,
    SectionCarouselWidgetLayout,
    SmallImageCarouselWidgetLayout,
    TwoImageListWidgetLayout,
    SmallImageListWidgetLayout,
    TelerikChartWidgetLayout,
    NavButtonWidget,
    NavButtonWidgetLayout,
    URLButtonWidget,
    URLButtonWidgetLayout,
} from '@Reptile/Components/Organisms';

const _useRegisterWidgets = (
    controller: Reptile.Controllers.ITemplateBuilderController
) => {
    const initialized = useRef(false);

    if (!initialized.current) {
        controller.register('app-button', {
            name: 'Button',
            icon: ButtonWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: ButtonWidget,
            category: 'basic',
            settings: ButtonWidgetLayout,
        });
        controller.register('app-image', {
            name: 'Image',
            icon: ImageWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: ImageWidget,
            category: 'basic',
            settings: ImageWidgetLayout,
        });
        controller.register('app-top-story', {
            name: 'Top Item',
            icon: TopItemWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: TopStoryWidget,
            category: 'advanced',
            settings: TopStoryWidgetLayout,
        });
        controller.register('app-article-carousel', {
            name: 'Small Carousel',
            icon: ItemCollection2WidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: SmallImageCarouselWidget,
            category: 'advanced',
            settings: SmallImageCarouselWidgetLayout,
        });
        controller.register('app-article-carousel-simple', {
            name: 'Large Carousel',
            icon: ItemCollection2WidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: LargeImageCarouselWidget,
            category: 'advanced',
            settings: LargeImageCarouselWidgetLayout,
        });
        controller.register('app-section-carousel', {
            name: 'Section Carousel',
            icon: ItemCollection2WidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: SectionCarouselWidget,
            category: 'advanced',
            settings: SectionCarouselWidgetLayout,
        });
        controller.register('app-article-collection-column', {
            name: 'Small Collection',
            icon: ItemCollection1WidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: SmallImageListWidget,
            category: 'advanced',
            settings: SmallImageListWidgetLayout,
        });
        controller.register('app-article-collection', {
            name: 'Large Collection',
            icon: ItemCollection1WidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: LargeImageListWidget,
            category: 'advanced',
            settings: LargeImageListWidgetLayout,
        });
        controller.register('app-rich-text', {
            name: 'Text',
            icon: RichTextWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: RichTextWidget,
            category: 'basic',
            settings: RichTextWidgetLayout,
        });
      
      
        controller.register('app-article-collection-two-items', {
            name: 'Double Collection',
            icon: ItemCollection1WidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: TwoImageListWidget,
            category: 'advanced',
            settings: TwoImageListWidgetLayout,
        });
        controller.register('telerik-button', {
            name: 'Telerik Button',
            icon: ButtonWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: TelerikButtonWidget,
            category: 'advanced',
            settings: TelerikButtonWidgetLayout,
        });
        controller.register('telerik-pie-chart', {
            name: 'Telerik Chart',
            icon: ButtonWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: TelerikChartWidget,
            category: 'advanced',
            settings: TelerikChartWidgetLayout,
        });
        controller.register('nav-button', {
            name: 'Navigation Button',
            icon: ButtonWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: NavButtonWidget,
            category: 'basic',
            settings: NavButtonWidgetLayout,
        });
        controller.register('url-button', {
            name: 'URL Button',
            icon: ButtonWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: URLButtonWidget,
            category: 'basic',
            settings: URLButtonWidgetLayout,
        });
  
     
        initialized.current = true;
    }
};

export default _useRegisterWidgets;



