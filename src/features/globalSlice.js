/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099";
const initialState = {
  isLoading: false,
  selected: {
    current: { id: null, index: null },
    nextIndex: null,
    prevIndex: null,
  },
  hotelNavState: {},
  hotelData: [],
  menuCategory: [],
  categoryDishes: [],
};
export const getData = createAsyncThunk("gobalSlice/getItem", async () =>
  fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
);

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setMenuCategory: (state) => {
      state.hotelData.table_menu_list?.forEach((item) => {
        state.menuCategory.push({
          name: item.menu_category,
          id: item.menu_category_id,
        });
      });
    },
    setCurrentDishes: (state, { payload }) => {
      if (payload) {
        const tempSlideData = state.hotelData.find(({ menu_category_id }) => {
          return menu_category_id === payload;
        });
        state.categoryDishes = tempSlideData.category_dishes;
      }
    },
    setSelected: (state, { payload }) => {
      if (payload) {
        state.selected.current = { index: payload.index, id: payload.id };
        state.selected.prevIndex = payload.index > 0 ? payload.index - 1 : 0;

        state.selected.nextIndex = payload.index + 1;
      }
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, action) => {
      const { payload } = action;
      state.hotelData = payload[0].table_menu_list;
      state.isLoading = false;
    },
    [getData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setMenuCategory, setCurrentDishes, setSelected } =
  globalSlice.actions;

export default globalSlice.reducer;
