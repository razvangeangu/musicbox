// eslint-disable-next-line no-restricted-imports
import { DefaultTheme } from 'styled-components';
import * as slice from 'styles/theme/slice';
import { themes } from 'styles/theme/themes';
import { ThemeKeyType, ThemeState } from 'styles/theme/types';
import { RootState } from 'types';

describe('theme slice', () => {
  let state: ThemeState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should changeTheme', () => {
    expect(slice.reducer(state, slice.changeTheme('dark'))).toEqual<ThemeState>(
      { selected: 'dark' },
    );
  });

  describe('selectors', () => {
    it('selectTheme', () => {
      let rootState: RootState = {};
      expect(slice.selectTheme(rootState)).toEqual<DefaultTheme>(themes.light);
      rootState = {
        theme: { selected: 'system' },
      };
      expect(slice.selectTheme(rootState)).toEqual<DefaultTheme>(themes.light);

      rootState = {
        theme: { selected: 'dark' },
      };
      expect(slice.selectTheme(rootState)).toEqual<DefaultTheme>(themes.dark);
    });

    it('selectThemeKey', () => {
      let rootState: RootState = {};
      expect(slice.selectThemeKey(rootState)).toEqual<ThemeKeyType>(
        slice.initialState.selected,
      );

      rootState = {
        theme: { selected: 'system' },
      };
      expect(slice.selectThemeKey(rootState)).toEqual<ThemeKeyType>(
        rootState.theme!.selected,
      );
    });
  });
});
