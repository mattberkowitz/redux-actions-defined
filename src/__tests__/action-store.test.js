import {
  getActions,
  getActionSchema,
  addAction,
  actionExists,
  removeAction,
  clearActions,
  validateActionPayload,
  getCreatorForAction
} from '../action-store';

import * as types from '../types'

afterEach(clearActions);

describe('Adding and removing', () => {
  test('addAction adds an action to the store', () => {
    expect(getActions().length).toBe(0);
    addAction('testAction', String);
    expect(getActions().length).toBe(1);
    expect(getActions()).toEqual(expect.arrayContaining(['testAction']));
  });
  test('removeAction removes an action from the store', () => {
    expect(getActions().length).toBe(0);
    addAction('testAction', String);
    expect(getActions().length).toBe(1);
    expect(getActions()).toEqual(expect.arrayContaining(['testAction']));
    removeAction('testAction');
    expect(getActions().length).toBe(0);
  });
  test('clearActions removes all actions', () => {
    expect(getActions().length).toBe(0);
    addAction('testAction', String);
    addAction('testAction2', String);
    expect(getActions().length).toBe(2);
    clearActions();
    expect(getActions().length).toBe(0);
  });
});

describe('validateActionPayload', () => {
  test('returns false for non-existant actions', () => {
    expect(validateActionPayload('idontexist', {})).toBe(false);
  })
  describe('returns true for payloads that match their defined scheams', () => {
    test('plain defined types', () => {
      addAction('testAction', types.String);
      expect(validateActionPayload('testAction', 'test')).toBe(true);
      expect(validateActionPayload('testAction', 1)).toBe(false);
      expect(validateActionPayload('testAction', false)).toBe(false);;
      expect(validateActionPayload('testAction', [])).toBe(false);;
      expect(validateActionPayload('testAction', {})).toBe(false);;
      expect(validateActionPayload('testAction', null)).toBe(false);;
      expect(validateActionPayload('testAction', undefined)).toBe(false);;
    })

  })
});
