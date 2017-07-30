var myStorage = {
    handler: localStorage,

    setItem: function(item) {
        var savedItem = myStorage.getItem(item.id);
        var items = myStorage.getItems();

        if (savedItem) {
            var index = items.map(function(it, ix) {
                if (savedItem.id === it.id) {
                    return ix;
                }
            }).filter(function(it) {
                return Number.isFinite(it);
            }).pop();
        }
        if (Number.isFinite(index)) {
            items[index] = item;
        } else {
            items.push(item);
        }

        myStorage.handler.setItem('items', JSON.stringify(items));
    },

    getItem: function(id) {
        var items = myStorage.getItems();
        var filteredItems = items.filter(function(it, index) {
            return it.id == id;
        });

        var item = null;

        if (filteredItems.length !== 0) {
            item = filteredItems[0];
        }

        return item;
    },

    removeItem: function(id) {
        var savedItem = myStorage.getItem(id);

        if (savedItem) {
            var items = myStorage.getItems();
            var index = items.map(function(it, ix) {
                if (savedItem.id == it.id) {
                    return ix;
                }
            }).filter(function(it) {
                return Number.isFinite(it);
            }).pop();

            if (items[index]) {
                items.splice(index, 1);
            }
        }

        myStorage.handler.setItem('items', JSON.stringify(items));
    },

    getItems: function() {
        var items = [];
        var itemsStr = myStorage.handler.getItem('items');

        if (itemsStr !== null) {
            items = JSON.parse(itemsStr);
        }
        return items;
    },

    generateNewId: function() {
        var newId = parseFloat(Math.round(Math.random() * 1000));
        return newId;
    }
}