interface Picker {
  pick(target: any): any;
  pickUp(target: any): any;
}

export function createPicker(schema: string): Picker;
