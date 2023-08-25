const transactionDummyData = [
  {
    Event: 'Buy',
    Item: 'Space Dog',
    Price: 0.009,
    From: '0x8f3c...70da',
    To: '0x4a7b...35e2',
    Date: '2022-09-15',
  },
  {
    Event: 'Buy',
    Item: 'Space Dog v2',
    Price: 0.001,
    From: '0xcdb9...98e1',
    To: '0x8f3c...70da',
    Date: '2022-10-10',
  },
  {
    Event: 'Buy',
    Item: 'Space Dog v3',
    Price: 1.0,
    From: '0x8f3c...70da',
    To: '0x9c84...d2e9',
    Date: '2022-11-20',
  },
]

export const transactionDummyDataColumns = [
  { id: 'Event', label: 'Event', align: 'left' },
  { id: 'Item', label: 'Item', align: 'left' },
  { id: 'Price', label: 'Price', align: 'right' },
  { id: 'From', label: 'From', align: 'left' },
  { id: 'To', label: 'To', align: 'left' },
  { id: 'Date', label: 'Date', align: 'left' },
]

export default transactionDummyData
