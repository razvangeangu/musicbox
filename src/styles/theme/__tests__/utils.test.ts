import * as utils from 'styles/theme/utils';

describe('theme utils', () => {
  it('should get storage item', () => {
    utils.saveTheme('system');
    expect(utils.getThemeFromStorage()).toBe('system');
  });
  it('should check system theme', () => {
    expect(utils.isSystemDark).toBeUndefined();
  });
});
