import Tooltip from "@semcore/tooltip";

export const data = [
  { name: 'Apple', category: 'Fruit', season: 'Fall', weight: 182, temp: 2 },
  { name: 'Apricot', category: 'Fruit', season: 'Summer', weight: 35, temp: 0 },
  { name: 'Artichoke', category: 'Vegetable', season: 'Spring', weight: 340, temp: 1 },
  { name: 'Asparagus', category: 'Vegetable', season: 'Spring', weight: 20, temp: 2 },
  { name: 'Banana', category: 'Fruit', season: 'Year - round', weight: 120, temp: 13 },
  { name: 'Beetroot', category: 'Vegetable', season: 'Winter', weight: 150, temp: 0 },
  { name: 'Blueberry', category: 'Fruit', season: 'Summer', weight: 1, temp: 1 },
  { name: 'Broccoli', category: 'Vegetable', season: 'Fall', weight: 225, temp: 0 },
  { name: 'Cabbage', category: 'Vegetable', season: 'Winter', weight: 900, temp: 1 },
  { name: 'Carrot', category: 'Vegetable', season: 'Year - round', weight: 60, temp: 0 },
  { name: 'Cauliflower', category: 'Vegetable', season: 'Fall', weight: 575, temp: 0 },
  { name: 'Cherry', category: 'Fruit', season: 'Summer', weight: 8, temp: 0 },
  { name: 'Cucumber', category: 'Vegetable', season: 'Summer', weight: 300, temp: 10 },
  { name: 'Eggplant', category: 'Vegetable', season: 'Summer', weight: 450, temp: 12 },
  { name: 'Fig', category: 'Fruit', season: 'Fall', weight: 50, temp: 0 },
  { name: 'Garlic', category: 'Vegetable', season: 'Summer', weight: 50, temp: 15 },
  { name: 'Grape', category: 'Fruit', season: 'Fall', weight: 5, temp: 1 },
  { name: 'Kale', category: 'Vegetable', season: 'Winter', weight: 60, temp: 0 },
  { name: 'Kiwi', category: 'Fruit', season: 'Winter', weight: 70, temp: 0 },
  { name: 'Lemon', category: 'Fruit', season: 'Winter', weight: 100, temp: 10 },
  { name: 'Lettuce', category: 'Vegetable', season: 'Spring', weight: 500, temp: 1 },
  { name: 'Mango', category: 'Fruit', season: 'Summer', weight: 330, temp: 12 },
  { name: 'Onion', category: 'Vegetable', season: 'Fall', weight: 110, temp: 15 },
  { name: 'Orange', category: 'Fruit', season: 'Winter', weight: 130, temp: 4 },
  { name: 'Peach', category: 'Fruit', season: 'Summer', weight: 150, temp: 0 },
  { name: 'Pear', category: 'Fruit', season: 'Fall', weight: 180, temp: 0 },
  { name: 'Radish', category: 'Vegetable', season: 'Spring', weight: 20, temp: 1 },
  { name: 'Spinach', category: 'Vegetable', season: 'Spring', weight: 30, temp: 0 },
  { name: 'Strawberry', category: 'Fruit', season: 'Spring', weight: 12, temp: 2 },
  { name: 'Zucchini', category: 'Vegetable', season: 'Summer', weight: 200, temp: 7 },
];

export const columns = [
  {
    name: 'name',
    children: 'Name',
    enabled: true,
    sortable: true
  },
  {
    name: 'category',
    children: 'Category',
    enabled: true,
    sortable: true,
  },
  {
    name: 'season',
    children: 'Season',
    enabled: true,
    sortable: true
  },
  {
    name: 'weight',
    children: 'Weight (g)',
    gtcWidth: 'max-content',
    justifyContent: 'right',
    enabled: true,
    sortable: true,
  },
  {
    name: 'temp',
    children: 'Storage temp. (℃)',
    tag: Tooltip,
    title: 'Ideal temperature needed to preserve the best taste and texture of fruits and vegetables during storage.',
    gtcWidth: 'max-content',
    justifyContent: 'right',
    enabled: false,
    sortable: true,
  },
]
