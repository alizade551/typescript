import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // Add listener to new entry form submit
  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement;

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    // index.html icerisindeki newItem id sahib elementi secirik ve tipini  HTMLInputElement goturutuk (Type Assertion deyilir qisaca olaraq)
    const input = document.getElementById('newItem') as HTMLInputElement;

    // newEntryText string deyerinde value alacaq ( inputdan gelir buda)
    const newEntryText: string = input.value.trim();

    // Burda eger inputdan aldigimiz metnin uzulugu 0 beraberdirse ve ya bosdursa  kodu sonlandirirq return ile bunnan sonraki setierlere kecmek imkani olmur kodun
    if (!newEntryText.length) return;

    // item ID hesablanmasi
    // fullList icinde hecne yoxdursa LIST bosdursa birinci  item ID = 1 teyin edirik
    // Eger varsa fullList.list.length  bunu icinde son id uzerine 1 elave edib Yeni id veririk
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    // yeni item burda yaratdiq
    const newItem = new ListItem(itemId.toString(), newEntryText);
    // yeni itemi to full list elave eledik
    fullList.addItem(newItem);
    input.value = '';
    // Re-render list with new item included
    template.render(fullList);
  });

  // Add listener to "Clear" button
  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;

  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  // load initial data
  fullList.load();
  // initial render of template
  template.render(fullList);
};

//DOMContentLoaded olduqda initApp methodu calishacaq
document.addEventListener('DOMContentLoaded', initApp);
