export class DateHelpers {
    public calculateAge(birthDate: Date | undefined, today: Date = new Date()): Number {

        if (typeof birthDate === 'undefined' || birthDate === today)
            return 0;

        const birthDateObj = new Date(birthDate);

        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    }
}