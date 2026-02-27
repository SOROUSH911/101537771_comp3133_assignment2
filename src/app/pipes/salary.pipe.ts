import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'salary', standalone: true })
export class SalaryPipe implements PipeTransform {
  transform(value: number | null | undefined, currencySymbol: string = '$'): string {
    if (value == null) return '';
    return `${currencySymbol}${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
