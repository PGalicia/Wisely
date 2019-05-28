/*
    allocateSpendingMoneyToItems calculate how much money to allocate to each items.
    
    Prerequisites: items should have a priority, and goalPrice property
*/
import { ITEMS } from "./../constant/items.js" // Constant

export const allocateSpendingMoneyToItems = (spendingMoney, items = ITEMS) => {

    // Preliminary check: If item list is emptyk return item list
    if (items.length === 0) { return items; }
    
    // Priority Items List and sort from lowest to highest goal price
    let highPriorityItems = items.filter(item => item.priority === 1).sort((a, b) => a.goalPrice - b.goalPrice);
    let mediumPriorityItems = items.filter(item => item.priority === 2).sort((a, b) => a.goalPrice - b.goalPrice);;
    let lowPriorityItems = items.filter(item => item.priority === 3).sort((a, b) => a.goalPrice - b.goalPrice);;

    // Check which item list from above contains an item
    let availableItems = [highPriorityItems, mediumPriorityItems, lowPriorityItems].filter(itemList => itemList.length > 0);

    // Iterate through available items
    let availableMoneyForEachItem = 0, leftOverMoney = 0;

    for(let itemList of availableItems) {

        // let moneyPool = availableItems.indexOf(itemList) === 0 ? spendingMoney : leftOverMoney;

        availableMoneyForEachItem = (spendingMoney / itemList.length).toFixed(2);

        for(let item of itemList) {

            // If there's a leftover, add it to the availableMoneyForEachItem
            let availableMoney = leftOverMoney > 0 ? parseFloat(leftOverMoney) + parseFloat(availableMoneyForEachItem) : availableMoneyForEachItem
    
            // If: goalPrice is less than availableMoney
            //      Item's currentPrice will equal its goalPrice
            //      leftOverMoney would then be difference between availableMoney and item's currentPrice
            // else: items currentPrice would equal to the availableMoney
            if(item.goalPrice < availableMoney) {
                item.currentPrice = item.goalPrice;
                leftOverMoney = (availableMoney - item.currentPrice).toFixed(2);
            } else {
                item.currentPrice = availableMoney;
            }
        }

        // Reset spendingMoney and leftOverMoney
        spendingMoney = leftOverMoney
        leftOverMoney = 0;
    }    

}