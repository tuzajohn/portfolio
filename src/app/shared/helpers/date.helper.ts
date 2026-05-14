import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateHelper {
  calculateAge(birthDate: Date, today: Date = new Date()): number {
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }
}
