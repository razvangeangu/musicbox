import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themes } from 'styles/theme/themes';
import { ThemeKeyType, ThemeState } from 'styles/theme/types';
import { getThemeFromStorage, isSystemDark } from 'styles/theme/utils';
import { RootState } from 'types';

export const initialState: ThemeState = {
  selected: getThemeFromStorage() || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.selected = action.payload;
    },
  },
});

export const selectTheme = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => {
    if (theme.selected === 'system') {
      if (isSystemDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
      }

      return isSystemDark ? themes.dark : themes.light;
    }

    if (theme.selected === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }

    return themes[theme.selected];
  },
);

export const selectThemeKey = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => theme.selected,
);

export const { changeTheme } = themeSlice.actions;
export const { reducer } = themeSlice;
export const themeSliceKey = themeSlice.name;
