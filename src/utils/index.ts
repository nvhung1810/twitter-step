export const handleFindYCoordinate = (
    xCoordinate: number,
    totalWidth: number
) => {
    const pathD =
        'M1 22.6915C45.7508 16.7814 256 -14 505 11C730.213 33.6117 871 47 1073 17';
    const svgHeight = 35;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    const pathLength = path.getTotalLength();
    const intersectionPoint = path.getPointAtLength(
        (xCoordinate / totalWidth) * pathLength
    );
    const yCoordinate = (intersectionPoint.y / svgHeight) * 30;

    return yCoordinate - 15;
};
