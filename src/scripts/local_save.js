const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log("Set state error:", error.message);
  }
};

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.log("Get state error:", error.message);
  }
};

const remove = async (key, id) => {
  try {
    const data = load(key);
    const element = data.indexOf(id);
    if (element > -1) {
      await data.splice(element, 1);
      const updatedValues = await [...data];
      await save(key, updatedValues);
    }
  } catch (error) {
    console.log("Delete state error:", error.message);
  }
};

export { save, load, remove };
