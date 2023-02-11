export function addElement(
   tag: string,
   classNames: string,
   content: string = '',
   attributes: { attr: string, attrValue: string }[] = [],
   dataSet: string = '',
   dataSetValue: string = ''
): HTMLElement {
   const el: HTMLElement = document.createElement(tag);
   el.className = classNames;
   if (attributes.length) {
      for (const i of attributes) {
         el.setAttribute(i.attr, i.attrValue);
      }
   }
   if (dataSet && dataSetValue) el.setAttribute(`data-${dataSet}`, dataSetValue);
   if (content) el.innerHTML = content;
   return el;
}

//only two columns
export function addTableRow(
   table: HTMLElement,
   contents: [string, HTMLElement[]] | string[],
   rowClassName: string,
   tdClassName: string): void {

   const row: HTMLElement = document.createElement('tr');
   row.className = rowClassName;
   let columnCounter = 1;
   for (const content of contents) {
      const td: HTMLElement = document.createElement('td');
      if (tdClassName) {
         td.className = `${tdClassName}_${columnCounter}`;
      } else {
         td.className = `col_${columnCounter}`;
      }
      if (typeof content === "string") {
         td.textContent = content;
      } else {
         for (const el of content) {
            td.append(el, el !== content.at(-1) ? ', ' : '');
         }
      }
      row.append(td);
      columnCounter += 1;
   }
   table.append(row);
}

export function addCard(className: string, imageLink: string, header: string, info: string): HTMLElement {
   const card: HTMLElement = addElement('div', className);
   const imgContainer: HTMLElement = addElement('div', `${className}__image`);
   const attrArr: { attr: string, attrValue: string }[] = [{ attr: 'src', attrValue: imageLink }, { attr: 'alt', attrValue: '' }]
   const img = addElement('img', '', '', attrArr);
   imgContainer.append(img);
   card.append(imgContainer);

   const headerContainer: HTMLElement = addElement('div', `${className}__header`);
   const title: HTMLElement = addElement('h5', '', header);
   headerContainer.append(title);
   card.append(headerContainer);

   const infoContainer: HTMLElement = addElement('div', `${className}__info`);
   const text: HTMLElement = addElement('p', '', info);
   infoContainer.append(text);
   card.append(infoContainer);

   return card;
}

// export function addCircle(value: number, maxValue: number) {
//    const svg = document.createElement('svg');
//    svg.className = 'svg-container';

//    const percent: number = value / maxValue * 100;
//    const RATING_SVG = (rating: number) => `<circle class="circle circle1" cx=70 cy=70 r=70></circle>
//                            <circle class="circle circle2" cx=70 cy=70 r=70 style.stroke-dashoffset = "${440 - (440 * rating)}"></circle>`
//    if (percent) {
//       svg.innerHTML = RATING_SVG(percent);
//    }

//    return svg;
// }