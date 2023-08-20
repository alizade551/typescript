import ListItem from './ListItem';

// List  yaradiriq
interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    // localStorage olan datani aliriq
    const storedList: string | null = localStorage.getItem('myList');
    //bosdursa return edib kodu dayandirirq burda
    if (typeof storedList !== 'string') return;

    //  tipi array olan icinde  obyektler kimi tanimliyiriq parse edirik
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      // ListItem classini cagirirq constructoruna  deyerlrun verib Listem yaradiriq
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );

      // FullList  Singleton  istifade ederek addItem methodu cagiriq ve paramtr olaraq  newListItem veririk
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    // localStorage myList adli deyishkene elave edirik
    localStorage.setItem('myList', JSON.stringify(this._list));
  }
  // liste bosh arrray verib silirik
  clearList(): void {
    this._list = [];
    this.save();
  }

  // ListItem classinin tipinde  itemObj Obyket veririk
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  // id - gore filtir edeirik save edirik
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
