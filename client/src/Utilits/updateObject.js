// items - элементы массива
// itemId - значения на сравнение (с чем сравнивать)
// objPropName - свойство, которое берем у объекта
// newObjProps  - новые свойства объекта

export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map((u) => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps }; //* наоборот
        }
        return u;
    })
};