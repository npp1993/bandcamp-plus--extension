import {INPUT_CLASS} from '../constants';

interface InputProps {
  value: number;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Class to represent an input component.
 * Use for faders, sliders, etc.
 */
export class InputComponent {
  private readonly node: HTMLInputElement;

  private readonly defaultValue: number;

  constructor({
    value,
    id = undefined,
    min = 0,
    max = 1,
    step = 0.01,
  }: InputProps) {
    this.node = document.createElement('input');
    this.node.type = 'range';
    this.node.min = min.toString();
    this.node.max = max.toString();
    this.node.step = step.toString();

    this.defaultValue = value;
    this.node.value = value.toString();

    this.node.classList.add(INPUT_CLASS);

    if (id) {
      this.node.id = id;
    }
  }

  public getNode(): HTMLInputElement {
    return this.node;
  }

  public onInput(callback: (e: Event) => void): void {
    this.node.oninput = callback;
  }

  public updateValue(value: number = undefined): void {
    this.node.value = value.toString();
    this.node.dispatchEvent(new Event('input'));
  }

  public resetValue(): void {
    this.node.value = this.defaultValue.toString();
  }

  public getValue(): number {
    return Number(this.node.value);
  }
}
