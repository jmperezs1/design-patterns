import type { CardBuilder } from "./builder";
import type { CardProduct } from "./product-card";

export class CardConcreteBuilder implements CardBuilder {
    private product: CardProduct;

    constructor() {
        this.product = {};
    }

    setTitle(title: string) {
        this.product.title = title;
        return this;
    }
    setSubtitle(subtitle: string) {
        this.product.subtitle = subtitle;
        return this;
    }
    setMedia(url: string) {
        this.product.mediaUrl = url;
        return this;
    }
    setBody(content: React.ReactNode) {
        this.product.body = content;
        return this;
    }

    setFooter(content: React.ReactNode) {
        this.product.footer = content;
        return this;
    }

    build(): CardProduct {
        return { ...this.product };
    }
}