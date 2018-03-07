var myStorage = {

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

            if (Number.isFinite(index)) {
                items[index] = item;
            }

        } else {
            items.push(item);
        }

        localStorage.setItem('items', JSON.stringify(items));
    },

    getItem: function(id) {
        var items = myStorage.getItems(); // [{text: "asdas", checked: true, id: 1}, ...]
        var filtereditems = items.filter(function(it, index) {
            return it.id == id;
        });

        var item = null;

        if (filtereditems.length !== 0) {
            item = filtereditems[0]
        }

        return item;
    },

    removeItem: function(id) {
        debugger;
        var savedItem = myStorage.getItem(id);

        if (savedItem) {
            var items = myStorage.getItems();
            var index = items.map(function(it, ix) {
                if (savedItem.id === it.id) {
                    return ix;
                }
            }).filter(function(it) {
                return Number.isFinite(it);
            }).pop();

            if (items[index]) {
                items.splice(index, 1);
            }

            localStorage.setItem('items', JSON.stringify(items));
        }
    },

    getItems: function() {
        var items = [];
        var itemsStr = localStorage.getItem('items');

        if (itemsStr !== null) {
            items = JSON.parse(itemsStr);
        }

        return items;
    }
}