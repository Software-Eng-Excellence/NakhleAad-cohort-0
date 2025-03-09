import { Item, ItemCategory } from "./Item.model";

export class Furniture implements Item {
    private type: string;
    private material: string;
    private color: string;
    private size: string;
    private style: string;
    private assemblyRequired: string;
    private warranty: string;

    constructor(
        type: string,
        material: string,
        color: string,
        size: string,
        style: string,
        assemblyRequired: string,
        warranty: string,
    ) {
        this.type = type;
        this.material = material;
        this.color = color;
        this.size = size;
        this.style = style;
        this.assemblyRequired = assemblyRequired;
        this.warranty = warranty;
    }

    getCategory(): ItemCategory {
        return ItemCategory.FURNITURE;
    }

    getType(): string {
        return this.type;
    }

    getMaterial(): string {
        return this.material;
    }

    getColor(): string {
        return this.color;
    }

    getSize(): string {
        return this.size;
    }

    getStyle(): string {
        return this.style;
    }

    getAssemblyRequired(): string {
        return this.assemblyRequired;
    }

    getWarranty(): string {
        return this.warranty;
    }
}