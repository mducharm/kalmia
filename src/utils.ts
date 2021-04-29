export const getSeverityColor = (number: number) => {
    switch (number) {
      case 1:
        return "text-emerald-800 bg-emerald-300";
      case 2:
        return "text-bluegray-800 bg-bluegray-300";
      case 3:
        return "text-amber-800 bg-amber-300";
      case 4:
        return "text-orange-800 bg-orange-300";
      case 5:
        return "text-red-800 bg-red-300";
      default:
        return "text-green-800 bg-green-300";
    }
}