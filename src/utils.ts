export const getSeverityColor = (number: number) => {
    switch (number) {
        case 1:
          return "emerald";
        case 2:
          return "bluegray";
        case 3:
          return "amber";
        case 4:
          return "orange";
        case 5:
          return "red";
        default:
          return "green";
      }
}