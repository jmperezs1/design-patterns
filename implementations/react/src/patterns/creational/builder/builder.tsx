import type { CardProduct } from "./product-card";

export interface CardBuilder {
    setTitle(title: string): this;
    setSubtitle(subtitle: string): this;
    setMedia(url: string): this;
    setBody(content: React.ReactNode): this;
    setFooter(content: React.ReactNode): this;
    build(): CardProduct;
}